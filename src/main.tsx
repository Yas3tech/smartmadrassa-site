import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { initializeLocale } from './lib/i18n';
import './styles/index.css';

/**
 * Le dictionnaire de la langue demandée est chargé avant d'importer App :
 * les composants lisent le contenu déjà traduit dès leur premier rendu, sans
 * passer par un état « français puis correction ».
 */
async function start() {
  await initializeLocale();
  const { default: App } = await import('./App');

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
