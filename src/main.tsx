import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { initializeLocale, t, locale } from './lib/i18n';
import './styles/index.css';

/**
 * Le dictionnaire de la langue demandée est chargé avant d'importer App :
 * les composants lisent le contenu déjà traduit dès leur premier rendu, sans
 * passer par un état « français puis correction ».
 */
async function start() {
  await initializeLocale();
  const { default: App } = await import('./App');

  document.title = `SmartMadrassa — ${t('La plateforme de gestion pour écoles associatives et instituts')}`;
  document
    .querySelector('meta[property="og:locale"]')
    ?.setAttribute('content', locale === 'nl' ? 'nl_BE' : locale === 'ar' ? 'ar' : 'fr_BE');

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MotionConfig>
    </StrictMode>,
  );

  // Retire l'écran de démarrage une fois React monté.
  requestAnimationFrame(() => {
    const boot = document.getElementById('boot');
    if (!boot) return;
    boot.classList.add('out');
    setTimeout(() => boot.remove(), 500);
  });
}

void start();
