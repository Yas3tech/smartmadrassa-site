/**
 * Rendu statique des métadonnées, route par route.
 *
 *   node scripts/prerender.mjs        (lancé automatiquement après vite build)
 *
 * Le site est une application monopage : le serveur renvoie le même index.html
 * pour les quatre routes. Les moteurs qui exécutent JavaScript finissent par
 * voir le bon titre — src/lib/seo.ts le pose au montage — mais deux familles de
 * robots ne l'exécutent pas :
 *
 *   - les aperçus de partage (WhatsApp, LinkedIn, X, Slack, Signal) lisent le
 *     HTML brut et rien d'autre. Sans ce script, partager la page de
 *     confidentialité affiche la carte de la page d'accueil ;
 *   - Google indexe d'abord le HTML brut, et ne repasse au rendu JavaScript
 *     que plus tard. Quatre pages annonçant la même balise canonique, c'est
 *     trois pages qui ne s'indexent pas.
 *
 * On écrit donc une copie d'index.html par route, avec ses propres balises, et
 * une page 404 qui se déclare non indexable. Le .htaccess aiguille vers elles.
 *
 * Le script injecte aussi le préchargement des polices du premier écran : les
 * fichiers sont découverts par Vite avec un nom haché, impossible à écrire à la
 * main dans index.html.
 */

import fs from 'node:fs';
import path from 'node:path';
import { chargerContenuFrancais } from './lib/contenu.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
const { SITE, PAGES, NOT_FOUND_PAGE, FAQ } = await chargerContenuFrancais(root);

const gabarit = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

/** Échappe ce qui part dans un attribut HTML. */
const attr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Échappe ce qui part dans un bloc <script type="application/ld+json">. */
const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

const url = (chemin) => new URL(chemin, SITE.url).href;

/**
 * Polices du premier écran. On en précharge deux, pas dix : chaque
 * préchargement se dispute la bande passante avec le HTML et le JS. Inter 400
 * porte le texte courant, Sora 800 le titre principal — le plus gros élément
 * affiché, donc celui que mesure le LCP.
 */
function preloadsPolices() {
  const assets = path.join(dist, 'assets');
  if (!fs.existsSync(assets)) return '';
  const fichiers = fs.readdirSync(assets);
  const critiques = ['inter-latin-400-normal', 'sora-latin-800-normal'];
  return critiques
    .map((base) => fichiers.find((f) => f.startsWith(base) && f.endsWith('.woff2')))
    .filter(Boolean)
    .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
    .join('\n    ');
}

/** L'éditeur du site, décrit une fois et réutilisé par les autres blocs. */
const EDITEUR = {
  '@type': 'Person',
  '@id': `${SITE.url}/#yassine-e`,
  name: 'Yassine E.',
  jobTitle: 'Créateur et éditeur indépendant',
  email: `mailto:${SITE.email}`,
  nationality: { '@type': 'Country', name: SITE.country },
};

const ORGANISATION = {
  '@context': 'https://schema.org',
  '@graph': [
    EDITEUR,
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organisation`,
      name: SITE.name,
      url: SITE.url,
      email: `mailto:${SITE.email}`,
      slogan: SITE.tagline,
      logo: { '@type': 'ImageObject', url: url('/icon-192.png'), width: 192, height: 192 },
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
      url: SITE.url,
      name: SITE.name,
      inLanguage: ['fr', 'nl', 'ar'],
      publisher: { '@id': `${SITE.url}/#organisation` },
    },
  ],
};

/** Fil d'Ariane : donne à Google la place de la page dans l'arborescence. */
const filAriane = (page) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: SITE.name, item: SITE.url },
    { '@type': 'ListItem', position: 2, name: page.title.split(' — ')[0], item: url(page.path) },
  ],
});

/** Le balisage FAQ est aussi posé à l'exécution par Faq.tsx ; ici il part dans
 *  le HTML brut, seul endroit que lisent les robots sans JavaScript. */
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const LOCALES = [
  ['fr', 'fr_BE'],
  ['nl', 'nl_BE'],
  ['ar', 'ar'],
];

function pageHtml(page, { indexable = true } = {}) {
  const canonique = url(page.path);
  let html = gabarit;

  const remplacer = (motif, valeur) => {
    if (!motif.test(html)) throw new Error(`Motif introuvable dans index.html : ${motif}`);
    html = html.replace(motif, valeur);
  };

  remplacer(/<title>[\s\S]*?<\/title>/, `<title>${attr(page.title)}</title>`);
  remplacer(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${attr(page.description)}" />`,
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
    `<meta property="og:title" content="${attr(page.ogTitle)}" />`,
  );
  remplacer(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${attr(page.description)}" />`,
  );
  remplacer(
    /<meta name="twitter:title"[^>]*\/>/,
    `<meta name="twitter:title" content="${attr(page.ogTitle)}" />`,
  );
  remplacer(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${attr(page.description)}" />`,
  );

  // Les variantes de langue pointent vers la même route, pas vers l'accueil.
  const alternates = indexable
    ? [
        ...LOCALES.map(
          ([lang]) =>
            `<link rel="alternate" hreflang="${lang}" href="${attr(lang === 'fr' ? canonique : `${canonique}?lang=${lang}`)}" />`,
        ),
        `<link rel="alternate" hreflang="x-default" href="${attr(canonique)}" />`,
        ...LOCALES.filter(([lang]) => lang !== 'fr').map(
          ([, og]) => `<meta property="og:locale:alternate" content="${og}" />`,
        ),
      ].join('\n    ')
    : '';
  html = html.replace(
    /<link rel="alternate" hreflang="fr"[\s\S]*?hreflang="x-default"[^>]*\/>/,
    alternates,
  );

  // Données structurées propres à la page, après le bloc générique.
  const blocs = [ORGANISATION];
  if (page.path === '/') blocs.push(FAQ_SCHEMA);
  else if (indexable) blocs.push(filAriane(page));
  const scripts = blocs
    .map((b) => `<script type="application/ld+json">${jsonLd(b)}</script>`)
    .join('\n    ');

  const preloads = preloadsPolices();
  html = html.replace('</head>', `  ${preloads}\n    ${scripts}\n  </head>`);

  return html;
}

/* ---------------------------------------------------------------- écriture */

const sortie = path.join(dist, 'pages');
fs.mkdirSync(sortie, { recursive: true });

let ecrits = 0;
for (const page of PAGES) {
  const html = pageHtml(page);
  if (page.path === '/') {
    fs.writeFileSync(path.join(dist, 'index.html'), html);
  } else {
    fs.writeFileSync(path.join(sortie, `${page.path.replace(/^\//, '')}.html`), html);
  }
  ecrits += 1;
}

fs.writeFileSync(path.join(dist, '404.html'), pageHtml(NOT_FOUND_PAGE, { indexable: false }));

console.log(`✓ Rendu statique — ${ecrits} route(s) + la page 404, métadonnées et données structurées incluses`);
