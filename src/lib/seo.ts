import { locale, isRtl, stripLocalePrefix } from './i18n';
import { PAGES, NOT_FOUND_PAGE, SITE } from '../content/site';

/**
 * Tête du document, mise à jour à chaque changement de route.
 *
 * Le site est une application monopage : sans cette mise à jour, les routes
 * partageraient le titre, la description et surtout la balise canonique
 * de l'accueil — Google considérerait alors les sous-pages comme des
 * doublons de la page d'accueil et n'en indexerait aucune.
 *
 * Le rendu statique (scripts/prerender.mjs) écrit déjà ces mêmes valeurs dans
 * le HTML servi, pour les robots qui n'exécutent pas JavaScript — les aperçus
 * de partage WhatsApp, LinkedIn et X, notamment. Ici on rattrape la navigation
 * côté client et le changement de langue.
 */

const LOCALE_OG: Record<string, string> = { fr: 'fr_BE', nl: 'nl_BE', ar: 'ar' };
const LOCALES = ['fr', 'nl', 'ar'] as const;

/** L'URL canonique porte la langue dans le chemin : standard d'or pour le SEO international. */
export function canonicalFor(path: string, lang: string = locale): string {
  const clean = stripLocalePrefix(path);
  const target = clean === '/' || clean === '' ? `/${lang}/` : `/${lang}${clean}`;
  return new URL(target, SITE.url).href;
}

function setMeta(selector: string, attribute: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attribute, value);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.append(el);
  }
  el.href = href;
}

export function applyPageSeo(pathname: string) {
  const cleanPath = stripLocalePrefix(pathname);
  const page = PAGES.find((p) => p.path === cleanPath || p.path === pathname) ?? NOT_FOUND_PAGE;
  const indexable = page !== NOT_FOUND_PAGE;

  document.title = page.title;
  setMeta('meta[name="description"]', 'content', page.description);
  setMeta('meta[property="og:title"]', 'content', page.ogTitle);
  setMeta('meta[property="og:description"]', 'content', page.description);
  setMeta('meta[name="twitter:title"]', 'content', page.ogTitle);
  setMeta('meta[name="twitter:description"]', 'content', page.description);
  setMeta('meta[property="og:locale"]', 'content', LOCALE_OG[locale] ?? 'fr_BE');

  // Une page d'erreur indexée est une page de plus qui dilue le site.
  setMeta(
    'meta[name="robots"]',
    'content',
    indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow',
  );

  const path = indexable ? page.path : pathname;
  setLink('canonical', canonicalFor(path));
  setMeta('meta[property="og:url"]', 'content', canonicalFor(path));

  if (indexable) {
    LOCALES.forEach((lang) => setLink('alternate', canonicalFor(path, lang), lang));
    setLink('alternate', canonicalFor(path, 'fr'), 'x-default');
  }

  document.documentElement.lang = locale;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
}
