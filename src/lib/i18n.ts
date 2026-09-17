export type Locale = 'fr' | 'nl' | 'ar';

export const LANGUAGES = ['fr', 'nl', 'ar'] as const;

function initialLocale(): Locale {
  // 1. Détection prioritaire par le premier segment du chemin d'URL (ex: /nl/..., /ar/...)
  const pathSegment = window.location.pathname.replace(/^\/+/, '').split('/')[0];
  if (pathSegment && (LANGUAGES as readonly string[]).includes(pathSegment)) {
    return pathSegment as Locale;
  }

  // 2. Repli sur le paramètre de requête ?lang= (rétrocompatibilité)
  const requested = new URLSearchParams(window.location.search).get('lang');
  if (requested && (LANGUAGES as readonly string[]).includes(requested)) return requested as Locale;

  // 3. Préférence mémorisée dans le navigateur
  try {
    const saved = localStorage.getItem('smartmadrassa-language');
    if (saved && (LANGUAGES as readonly string[]).includes(saved)) return saved as Locale;
  } catch { /* Navigation still works when storage is blocked. */ }

  return 'fr';
}

export const locale = initialLocale();
export const isRtl = locale === 'ar';
let messages: Record<string, string> = {};

/** Load only the selected translation before evaluating the page components. */
export async function initializeLocale() {
  if (locale === 'nl') messages = (await import('../content/translations/nl.json')).default;
  if (locale === 'ar') messages = (await import('../content/translations/ar.json')).default;
  document.documentElement.lang = locale;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  try { localStorage.setItem('smartmadrassa-language', locale); } catch { /* Optional persistence. */ }
}

export function t(source: string): string {
  if (locale === 'fr') return source;
  const key = source.replace(/\s+/g, ' ').trim();
  const value = messages[key];
  if (!value) return source;
  return `${/^\s/.test(source) ? ' ' : ''}${value}${/\s$/.test(source) ? ' ' : ''}`;
}

/** Keep identifiers, destinations and the deliberately trilingual demo intact. */
const structuralKeys = new Set(['id', 'href', 'url', 'path', 'appUrl', 'domain', 'email', 'icon', 'accent', 'span', 'mock', 'dir', 'code', 'sample']);
export function translateContent<T>(value: T, key = ''): T {
  if (typeof value === 'string') return (structuralKeys.has(key) ? value : t(value)) as T;
  if (Array.isArray(value)) return value.map(item => translateContent(item)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, translateContent(v, k)])) as T;
  }
  return value;
}

/** Retire un éventuel préfixe de langue au début d'un chemin. */
export function stripLocalePrefix(path: string): string {
  const clean = path.replace(/^\/+/, '');
  const segments = clean.split('/');
  if ((LANGUAGES as readonly string[]).includes(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return path.startsWith('/') ? path : `/${path}`;
}

export function localizedHref(href: string): string {
  if (!href || href.startsWith('//') || href.startsWith('http:') || href.startsWith('https:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href;
  }
  if (href.startsWith('#')) return href;

  // Sépare chemin et ancre éventuelle
  const [basePath, hash] = href.split('#');
  const cleanPath = stripLocalePrefix(basePath || '/');
  const hashPart = hash ? `#${hash}` : '';

  if (cleanPath === '/' || cleanPath === '') {
    return `/${locale}${hashPart}`;
  }
  return `/${locale}${cleanPath}${hashPart}`;
}

export function changeLocale(next: Locale) {
  const currentPath = window.location.pathname;
  const cleanPath = stripLocalePrefix(currentPath);
  const nextPath = cleanPath === '/' ? `/${next}/` : `/${next}${cleanPath}`;
  const url = new URL(nextPath, window.location.origin);
  url.search = window.location.search;
  // Retire l'ancien paramètre ?lang= s'il existait
  url.searchParams.delete('lang');
  url.hash = window.location.hash;

  try { localStorage.setItem('smartmadrassa-language', next); } catch { /* URL remains authoritative. */ }
  window.location.assign(url.href);
}
