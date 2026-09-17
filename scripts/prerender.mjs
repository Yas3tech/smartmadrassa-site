/**
 * Rendu statique des métadonnées et des pages, route par route et langue par langue.
 *
 *   node scripts/prerender.mjs        (lancé automatiquement après vite build)
 *
 * Architecture multilingue par chemin :
 *   - /fr/...  (français, par défaut)
 *   - /nl/...  (néerlandais)
 *   - /ar/...  (arabe avec dir="rtl")
 *   - /        (redirection propre vers la langue préférée)
 *
 * Pour chaque route et chaque langue, ce script écrit une page HTML pré-rendue
 * contenant les bonnes balises de métadonnées, les liens canoniques et alternats
 * hreflang réciproques, les données structurées Schema.org, et génère automatiquement
 * le fichier sitemap.xml complet.
 */

import fs from 'node:fs';
import path from 'node:path';
import { chargerContenuFrancais } from './lib/contenu.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
const { SITE, PAGES, NOT_FOUND_PAGE, FAQ } = await chargerContenuFrancais(root);

const nlDict = JSON.parse(fs.readFileSync(path.join(root, 'src/content/translations/nl.json'), 'utf8'));
const arDict = JSON.parse(fs.readFileSync(path.join(root, 'src/content/translations/ar.json'), 'utf8'));

const templateSavedPath = path.join(dist, '_template.html');
let gabarit;
const currentDistIndex = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

if (currentDistIndex.includes('<meta http-equiv="refresh"') && fs.existsSync(templateSavedPath)) {
  gabarit = fs.readFileSync(templateSavedPath, 'utf8');
} else {
  gabarit = currentDistIndex;
  fs.writeFileSync(templateSavedPath, currentDistIndex);
}

/** Échappe ce qui part dans un attribut HTML. */
const attr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Échappe ce qui part dans un bloc <script type="application/ld+json">. */
const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

const LOCALES = [
  ['fr', 'fr_BE', 'ltr'],
  ['nl', 'nl_BE', 'ltr'],
  ['ar', 'ar', 'rtl'],
];

/** Calcule l'URL canonique absolue pour un chemin et une langue. */
function langUrl(pagePath, lang) {
  const clean = pagePath.replace(/^\/+/, '');
  if (!clean) return `${SITE.url}/${lang}/`;
  return `${SITE.url}/${lang}/${clean}`;
}

/** Traduit une chaîne selon la langue demandée. */
function traduire(phrase, lang) {
  if (!phrase || lang === 'fr') return phrase;
  const clean = phrase.replace(/\s+/g, ' ').trim();
  if (lang === 'nl') return nlDict[clean] || phrase;
  if (lang === 'ar') return arDict[clean] || phrase;
  return phrase;
}

/** Préchargement des polices critiques. */
function preloadsPolices(lang) {
  const assets = path.join(dist, 'assets');
  if (!fs.existsSync(assets)) return '';
  const fichiers = fs.readdirSync(assets);
  const critiques = lang === 'ar'
    ? ['cairo-arabic-400-normal', 'cairo-arabic-700-normal', 'sora-latin-800-normal']
    : ['inter-latin-400-normal', 'sora-latin-800-normal'];

  return critiques
    .map((base) => fichiers.find((f) => f.startsWith(base) && f.endsWith('.woff2')))
    .filter(Boolean)
    .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
    .join('\n    ');
}

/** L'éditeur du site */
const EDITEUR = {
  '@type': 'Person',
  '@id': `${SITE.url}/#yassine-e`,
  name: 'Yassine E.',
  jobTitle: 'Créateur et éditeur indépendant',
  email: `mailto:${SITE.email}`,
  nationality: { '@type': 'Country', name: SITE.country },
};

function getOrganisationSchema(lang) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      EDITEUR,
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organisation`,
        name: SITE.name,
        url: `${SITE.url}/${lang}/`,
        email: `mailto:${SITE.email}`,
        slogan: traduire(SITE.tagline, lang),
        logo: { '@type': 'ImageObject', url: `${SITE.url}/icon-192.png`, width: 192, height: 192 },
        founder: { '@id': EDITEUR['@id'] },
        foundingLocation: { '@type': 'Country', name: SITE.country },
        areaServed: { '@type': 'Country', name: SITE.country },
        knowsLanguage: ['fr', 'nl', 'ar'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Service commercial et support',
          email: `mailto:${SITE.email}`,
          availableLanguage: ['French', 'Dutch', 'Arabic'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#site`,
        url: `${SITE.url}/${lang}/`,
        name: SITE.name,
        inLanguage: ['fr', 'nl', 'ar'],
        publisher: { '@id': `${SITE.url}/#organisation` },
      },
    ],
  };
}

/** Fil d'Ariane Schema.org */
const filAriane = (page, lang) => {
  const fullTitle = traduire(page.title, lang);
  const pageTitle = fullTitle.split(' | ')[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE.name, item: `${SITE.url}/${lang}/` },
      { '@type': 'ListItem', position: 2, name: pageTitle, item: langUrl(page.path, lang) },
    ],
  };
};

/** Balisage FAQ Schema.org */
const faqSchema = (lang) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: traduire(item.q, lang),
    acceptedAnswer: { '@type': 'Answer', text: traduire(item.a, lang) },
  })),
});

function pageHtml(page, lang = 'fr', { indexable = true } = {}) {
  const canonique = langUrl(page.path, lang);
  const [, ogLocale, dir] = LOCALES.find(([l]) => l === lang) || ['fr', 'fr_BE', 'ltr'];
  const title = traduire(page.title, lang);
  const description = traduire(page.description, lang);
  const ogTitle = traduire(page.ogTitle, lang);

  let html = gabarit;

  const remplacer = (motif, valeur) => {
    if (!motif.test(html)) throw new Error(`Motif introuvable dans index.html : ${motif}`);
    html = html.replace(motif, valeur);
  };

  // Balise HTML lang et dir
  remplacer(/<html[^>]*>/, `<html lang="${lang}" dir="${dir}" data-theme="light">`);

  remplacer(/<title>[\s\S]*?<\/title>/, `<title>${attr(title)}</title>`);
  remplacer(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${attr(description)}" />`,
  );
  remplacer(
    /<link rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${attr(canonique)}" />`,
  );
  remplacer(
    /<meta name="robots"[^>]*\/>/,
    indexable
      ? '<meta name="robots" content="index, follow, max-image-preview:large" />'
      : '<meta name="robots" content="noindex, follow" />',
  );
  remplacer(/<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${attr(canonique)}" />`);
  remplacer(
    /<meta property="og:title"[^>]*\/>/,
    `<meta property="og:title" content="${attr(ogTitle)}" />`,
  );
  remplacer(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${attr(description)}" />`,
  );
  remplacer(/<meta property="og:locale"[^>]*\/>/, `<meta property="og:locale" content="${ogLocale}" />`);
  remplacer(
    /<meta name="twitter:title"[^>]*\/>/,
    `<meta name="twitter:title" content="${attr(ogTitle)}" />`,
  );
  remplacer(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${attr(description)}" />`,
  );

  // Variantes hreflang réciproques par chemin
  const alternates = indexable
    ? [
        `<link rel="alternate" hreflang="fr" href="${attr(langUrl(page.path, 'fr'))}" />`,
        `<link rel="alternate" hreflang="nl" href="${attr(langUrl(page.path, 'nl'))}" />`,
        `<link rel="alternate" hreflang="ar" href="${attr(langUrl(page.path, 'ar'))}" />`,
        `<link rel="alternate" hreflang="x-default" href="${attr(langUrl(page.path, 'fr'))}" />`,
        ...LOCALES.filter(([l]) => l !== lang).map(
          ([, og]) => `<meta property="og:locale:alternate" content="${og}" />`,
        ),
      ].join('\n    ')
    : '';

  html = html.replace(
    /<link rel="alternate" hreflang="fr"[\s\S]*?hreflang="x-default"[^>]*\/>/,
    alternates,
  );

  // Données structurées
  const blocs = [getOrganisationSchema(lang)];
  if (page.path === '/') blocs.push(faqSchema(lang));
  else if (indexable) blocs.push(filAriane(page, lang));

  const scripts = blocs
    .map((b) => `<script type="application/ld+json">${jsonLd(b)}</script>`)
    .join('\n    ');

  const preloads = preloadsPolices(lang);
  html = html.replace('</head>', `  ${preloads}\n    ${scripts}\n  </head>`);

  return html;
}

/* ---------------------------------------------------------------- écriture */

let ecrits = 0;

for (const [lang] of LOCALES) {
  const langDir = path.join(dist, lang);
  fs.mkdirSync(langDir, { recursive: true });

  for (const page of PAGES) {
    const html = pageHtml(page, lang);
    const cleanPath = page.path.replace(/^\/+/, '');

    if (!cleanPath) {
      // Accueil pour cette langue (ex: dist/fr/index.html)
      fs.writeFileSync(path.join(langDir, 'index.html'), html);
    } else {
      // Sous-page : écrite dans dist/${lang}/${cleanPath}/index.html (structure universelle)
      const subDir = path.join(langDir, cleanPath);
      fs.mkdirSync(subDir, { recursive: true });
      fs.writeFileSync(path.join(subDir, 'index.html'), html);

      // Compatibilité fichier plat pour .htaccess (ex: dist/pages/fr/fonctionnalites-presences.html)
      const flatDir = path.join(dist, 'pages', lang);
      fs.mkdirSync(flatDir, { recursive: true });
      const flatName = `${cleanPath.replace(/\//g, '-')}.html`;
      fs.writeFileSync(path.join(flatDir, flatName), html);

      // Compatibilité ascendante chemins legacy (dist/pages/mentions-legales.html, etc.)
      if (lang === 'fr') {
        fs.writeFileSync(path.join(dist, 'pages', flatName), html);
      }
    }
    ecrits += 1;
  }
}

// Page d'erreur 404 globale
fs.writeFileSync(path.join(dist, '404.html'), pageHtml(NOT_FOUND_PAGE, 'fr', { indexable: false }));

// Page racine dist/index.html : redirection élégante vers la langue de l'utilisateur
const rootRedirectHtml = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="${SITE.url}/fr/" />
  <link rel="alternate" hreflang="fr" href="${SITE.url}/fr/" />
  <link rel="alternate" hreflang="nl" href="${SITE.url}/nl/" />
  <link rel="alternate" hreflang="ar" href="${SITE.url}/ar/" />
  <link rel="alternate" hreflang="x-default" href="${SITE.url}/fr/" />
  <meta http-equiv="refresh" content="0; url=/fr/" />
  <script>
    (function() {
      try {
        var saved = localStorage.getItem('smartmadrassa-language');
        if (saved && (saved === 'nl' || saved === 'ar')) {
          window.location.replace('/' + saved + '/');
          return;
        }
        var lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (lang.startsWith('nl')) { window.location.replace('/nl/'); return; }
        if (lang.startsWith('ar')) { window.location.replace('/ar/'); return; }
      } catch (e) {}
      window.location.replace('/fr/');
    })();
  </script>
  <title>SmartMadrassa</title>
</head>
<body>
  <p>Redirection vers <a href="/fr/">SmartMadrassa</a>...</p>
</body>
</html>`;

fs.writeFileSync(path.join(dist, 'index.html'), rootRedirectHtml);

/* ---------------------------------------------------------------- sitemap.xml */

const aujourdhui = new Date().toISOString().split('T')[0];

const sitemapEntries = PAGES.flatMap((page) => {
  const clean = page.path.replace(/^\/+/, '');
  const priority = clean === '' ? '1.0' : page.path.startsWith('/fonctionnalites') || page.path === '/tarifs' ? '0.9' : '0.8';
  const changefreq = clean === '' ? 'weekly' : 'monthly';

  return LOCALES.map(([lang]) => {
    const loc = langUrl(page.path, lang);
    return `  <url>
    <loc>${attr(loc)}</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${attr(langUrl(page.path, 'fr'))}" />
    <xhtml:link rel="alternate" hreflang="nl" href="${attr(langUrl(page.path, 'nl'))}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${attr(langUrl(page.path, 'ar'))}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${attr(langUrl(page.path, 'fr'))}" />
    <lastmod>${aujourdhui}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Sitemap officiel SmartMadrassa, généré automatiquement à partir de src/content/site.fr.ts
  Chaque page est déclarée dans ses trois langues (/fr/, /nl/, /ar/) avec hreflang réciproques.
-->
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${sitemapEntries.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemapXml);
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemapXml);

console.log(`✓ Rendu statique — ${ecrits} page(s) générée(s) sur 3 langues (/fr/, /nl/, /ar/) + page 404`);
console.log(`✓ Sitemap XML généré automatiquement — ${sitemapEntries.length} URLs multilingues indexables`);
