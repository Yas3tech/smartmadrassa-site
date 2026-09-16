export type Locale = 'fr' | 'nl' | 'ar';

const languages = ['fr', 'nl', 'ar'];
function initialLocale(): Locale {
  const requested = new URLSearchParams(window.location.search).get('lang');
  if (requested && languages.includes(requested)) return requested as Locale;
  try {
    const saved = localStorage.getItem('smartmadrassa-language');
    if (saved && languages.includes(saved)) return saved as Locale;
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
const structuralKeys = new Set(['id', 'href', 'url', 'appUrl', 'domain', 'email', 'icon', 'accent', 'span', 'mock', 'dir', 'code', 'sample']);
export function translateContent<T>(value: T, key = ''): T {
  if (typeof value === 'string') return (structuralKeys.has(key) ? value : t(value)) as T;
  if (Array.isArray(value)) return value.map(item => translateContent(item)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, translateContent(v, k)])) as T;
  }
  return value;
}

export function localizedHref(href: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const url = new URL(href, window.location.origin);
  url.searchParams.set('lang', locale);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function changeLocale(next: Locale) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', next);
  try { localStorage.setItem('smartmadrassa-language', next); } catch { /* URL remains authoritative. */ }
  window.location.assign(url.href);
}
