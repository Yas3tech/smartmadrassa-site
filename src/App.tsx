import { useEffect } from 'react';
import { Route, Routes, useLocation, Navigate, useParams } from 'react-router-dom';
import { t, locale, stripLocalePrefix, LANGUAGES } from './lib/i18n';
import { applyPageSeo } from './lib/seo';
import { useScrollRestoration } from './lib/useScrollRestoration';
import { envoyerPageVue, initialiserAnalytics } from './lib/analytics';
import { ConsentBanner } from './components/layout/ConsentBanner';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { Header, ScrollProgress } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Conditions, Confidentialite, MentionsLegales, NotFound } from './pages/Legal';
import { ContentPage } from './pages/ContentPage';
import { PAGES } from './content/site';

function RootRedirect() {
  const queryLang = new URLSearchParams(window.location.search).get('lang');
  const target = queryLang && (LANGUAGES as readonly string[]).includes(queryLang) ? queryLang : locale;
  return <Navigate to={`/${target}/`} replace />;
}

function LangGuard({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  if (!lang || !(LANGUAGES as readonly string[]).includes(lang)) {
    return <NotFound />;
  }
  return <>{children}</>;
}

function LegacyOrNotFound() {
  const { pathname, search, hash } = useLocation();
  const cleanPath = stripLocalePrefix(pathname);
  const knownPage = PAGES.some((p) => p.path === cleanPath || p.path === pathname);

  if (knownPage) {
    return <Navigate to={`/${locale}${cleanPath}${search}${hash}`} replace />;
  }
  return <NotFound />;
}

export default function App() {
  const { pathname } = useLocation();

  // Titre, description et canonique suivent la route avec sa langue
  useEffect(() => {
    applyPageSeo(pathname);
  }, [pathname]);

  useScrollRestoration();

  // La mesure d'audience ne redémarre que si elle avait déjà été acceptée
  useEffect(() => {
    initialiserAnalytics();
  }, []);

  // Émission de page vue dans GA4 au changement de route
  useEffect(() => {
    envoyerPageVue(pathname + window.location.search);
  }, [pathname]);

  return (
    <>
      <a
        href="#plateforme"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        {t("Aller au contenu")}
      </a>

      <ScrollProgress />
      <Header />

      <ErrorBoundary>
        <Routes>
          {/* Redirection propre de la racine vers la langue cible */}
          <Route path="/" element={<RootRedirect />} />

          {/* Routes avec préfixe de langue /fr/, /nl/, /ar/ */}
          <Route path="/:lang" element={<LangGuard><Home /></LangGuard>} />
          <Route path="/:lang/" element={<LangGuard><Home /></LangGuard>} />
          <Route path="/:lang/mentions-legales" element={<LangGuard><MentionsLegales /></LangGuard>} />
          <Route path="/:lang/confidentialite" element={<LangGuard><Confidentialite /></LangGuard>} />
          <Route path="/:lang/conditions-utilisation" element={<LangGuard><Conditions /></LangGuard>} />
          <Route path="/:lang/:category" element={<LangGuard><ContentPage /></LangGuard>} />
          <Route path="/:lang/:category/:slug" element={<LangGuard><ContentPage /></LangGuard>} />

          {/* Rétrocompatibilité pour les URL sans préfixe ou 404 */}
          <Route path="*" element={<LegacyOrNotFound />} />
        </Routes>
      </ErrorBoundary>

      <Footer />
      <ConsentBanner />
    </>
  );
}
