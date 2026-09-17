import { useLocation } from 'react-router-dom';
import { CONTENT_PAGES } from '../content/pagesData';
import { ContentPageLayout } from '../components/layout/ContentPageLayout';
import { NotFound } from './Legal';
import { stripLocalePrefix, translateContent } from '../lib/i18n';

export function ContentPage({ slug: explicitSlug }: { slug?: string }) {
  const { pathname } = useLocation();

  // Retire le préfixe de langue et la barre finale (ex: /fr/fonctionnalites/presences/ -> fonctionnalites/presences)
  const currentSlug = explicitSlug ?? stripLocalePrefix(pathname).replace(/^\//, '');

  const rawEntry = CONTENT_PAGES.find((p) => p.slug === currentSlug);

  if (!rawEntry) {
    return <NotFound />;
  }

  // Traduction dynamique du contenu de la page selon la langue active
  const page = translateContent(rawEntry);

  return <ContentPageLayout {...page} />;
}
