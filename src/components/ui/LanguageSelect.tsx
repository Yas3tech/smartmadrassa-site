import { changeLocale, locale, t, type Locale } from '../../lib/i18n';

export function LanguageSelect() {
  return (
    <select
      aria-label={t('Langue du site')}
      title={t('Choisir la langue')}
      value={locale}
      onChange={event => changeLocale(event.target.value as Locale)}
      className="h-10 max-w-[5rem] shrink-0 cursor-pointer rounded-full border border-contrast/10 bg-ink-900/80 px-2 text-xs font-semibold text-slate-300 focus:border-brand-500"
      dir="ltr"
    >
      <option value="fr" lang="fr">FR</option>
      <option value="nl" lang="nl">NL</option>
      <option value="ar" lang="ar">العربية</option>
    </select>
  );
}
