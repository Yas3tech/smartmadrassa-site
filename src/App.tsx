import { Route, Routes } from 'react-router-dom';
import { Header, ScrollProgress } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Conditions, Confidentialite, MentionsLegales, NotFound } from './pages/Legal';

export default function App() {
  return (
    <>
      <a
        href="#plateforme"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Aller au contenu
      </a>

      <ScrollProgress />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/conditions-utilisation" element={<Conditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}
