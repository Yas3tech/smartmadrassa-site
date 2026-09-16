import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { t, localizedHref } from '../../lib/i18n';
import { EASE } from '../../lib/motion';
import {
  analyticsDisponible,
  definirConsentement,
  lireConsentement,
} from '../../lib/analytics';

/**
 * Demande de consentement à la mesure d'audience.
 *
 * Deux exigences du RGPD structurent ce composant :
 *
 *   - refuser doit être aussi simple qu'accepter. Les deux boutons ont donc la
 *     même taille, la même place et le même poids visuel. Pas de « Accepter »
 *     en grand orange et de « Paramètres » en gris minuscule ;
 *   - le choix doit pouvoir être retiré. Un lien dans le pied de page rouvre
 *     cette bande, et refuser efface les cookies déjà posés.
 *
 * Sans identifiant de mesure configuré, la bande ne s'affiche jamais : le site
 * ne dépose alors aucun cookie et n'a rien à demander.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!analyticsDisponible) return;
    if (lireConsentement() === null) setVisible(true);

    // Le pied de page peut rouvrir la demande après coup.
    const rouvrir = () => setVisible(true);
    window.addEventListener('smartmadrassa:consentement', rouvrir);
    return () => window.removeEventListener('smartmadrassa:consentement', rouvrir);
  }, []);

  const repondre = (valeur: 'accepte' | 'refuse') => {
    definirConsentement(valeur);
    setVisible(false);
  };

  if (!analyticsDisponible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label={t('Mesure d’audience')}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-4 sm:pb-4"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-contrast/12 bg-ink-950/98 p-4 shadow-header backdrop-blur-xl sm:p-5">
            <p className="text-pretty text-sm leading-relaxed text-slate-300">
              {t('J’aimerais mesurer l’audience de ce site — combien de personnes le consultent et quelles pages les intéressent — avec Google Analytics, qui dépose des cookies. Rien n’est envoyé tant que vous n’avez pas accepté, et refuser ne change rien à votre navigation.')}{' '}
              <Link
                to={`${localizedHref('/confidentialite')}#cookies`}
                className="text-accent underline underline-offset-2"
              >
                {t('En savoir plus')}
              </Link>
            </p>

            {/* Même taille, même poids : refuser ne doit pas être plus difficile. */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => repondre('refuse')}
                // Même surface pleine que « Accepter » : un refus en bouton
                // fantôme se lit comme un second choix, ce que l'APD reproche.
                className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center rounded-full border border-contrast/25 bg-contrast/[0.07] px-5 text-sm font-semibold text-contrast transition-colors hover:bg-contrast/[0.12]"
              >
                {t('Refuser')}
              </button>
              <button
                type="button"
                onClick={() => repondre('accepte')}
                className="button-primary inline-flex min-h-[2.75rem] flex-1 items-center justify-center rounded-full px-5 text-sm font-semibold text-white"
              >
                {t('Accepter')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Rouvre la demande de consentement depuis n'importe où (pied de page). */
export function rouvrirConsentement() {
  window.dispatchEvent(new Event('smartmadrassa:consentement'));
}
