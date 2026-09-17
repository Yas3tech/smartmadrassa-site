import { useLocation } from 'react-router-dom';
import { CONTENT_PAGES } from '../content/pagesData';
import { ContentPageLayout } from '../components/layout/ContentPageLayout';
import { NotFound } from './Legal';
import { translateContent } from '../lib/i18n';

export function ContentPage({ slug: explicitSlug }: { slug?: string }) {
  const { pathname } = useLocation();

  // Retire le préfixe de langue s'il est présent (ex: /fr/fonctionnalites/presences -> fonctionnalites/presences)
  const segments = pathname.replace(/^\/+/, '').split('/');
  const langPrefix = ['fr', 'nl', 'ar'].includes(segments[0]) ? segments[0] : null;
  const currentSlug = explicitSlug ?? (langPrefix ? segments.slice(1).join('/') : segments.join('/'));

  const rawEntry = CONTENT_PAGES.find((p) => p.slug === currentSlug);

  if (!rawEntry) {
    return <NotFound />;
  }

  // Traduction dynamique du contenu de la page selon la langue active
  const page = translateContent(rawEntry);

  return <ContentPageLayout {...page} />;
}
