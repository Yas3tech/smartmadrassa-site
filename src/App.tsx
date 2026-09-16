import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { t } from './lib/i18n';
import { applyPageSeo } from './lib/seo';
import { useScrollRestoration } from './lib/useScrollRestoration';
import { envoyerPageVue, initialiserAnalytics } from './lib/analytics';
import { ConsentBanner } from './components/layout/ConsentBanner';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { Header, ScrollProgress } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Conditions, Confidentialite, MentionsLegales, NotFound } from './pages/Legal';

export default function App() {
  const { pathname } = useLocation();

  // Titre, description et canonique suivent la route : sans cela les quatre
  // pages se présenteraient aux moteurs comme des doublons de l'accueil.
  useEffect(() => {
    applyPageSeo(pathname);
  }, [pathname]);

  useScrollRestoration();

  // La mesure ne redémarre que si elle avait déjà été acceptée.
  useEffect(() => {
    initialiserAnalytics();
  }, []);

  // Application monopage : aucun rechargement, donc aucune page vue que Google
  // pourrait observer de lui-même. On les émet au changement de route, une fois
  // le titre posé par applyPageSeo().
  useEffect(() => {
    envoyerPageVue(pathname + window.location.search);
  }, [pathname]);

  return (
    <>
      <a
        href="#plateforme"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >{t("Aller au contenu")}</a>

      <ScrollProgress />
      <Header />

      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/conditions-utilisation" element={<Conditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>

      <Footer />
      <ConsentBanner />
    </>
  );
}
