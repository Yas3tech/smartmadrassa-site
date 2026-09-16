import { Component, type ErrorInfo, type ReactNode } from 'react';
import { t } from '../../lib/i18n';
import { SITE } from '../../content/site';

type Props = { children: ReactNode };
type State = { failed: boolean };

/**
 * Filet de sécurité de rendu.
 *
 * Une erreur non rattrapée dans un composant React démonte tout l'arbre : le
 * visiteur se retrouve devant une page blanche, sans en-tête ni pied de page,
 * donc sans aucun moyen de nous joindre. On préfère afficher un message et un
 * lien de contact, et laisser l'en-tête et le pied de page en place — ils sont
 * montés en dehors de cette limite.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Pas de service de télémétrie sur ce site : la console reste le seul
    // endroit où l'erreur est lisible, y compris depuis un téléphone branché.
    console.error('Rendu interrompu :', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <main className="relative pb-24 pt-32 sm:pt-40">
        <div className="container-x max-w-xl text-center">
          <h1 className="font-display text-2xl font-bold sm:text-3xl">
            {t('Une erreur est survenue')}
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-slate-400">
            {t('La page n’a pas pu s’afficher correctement. Rechargez-la, et si le problème persiste, écrivez-moi — je corrige.')}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="button-primary inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white"
            >
              {t('Recharger la page')}
            </button>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-contrast/15 px-6 py-3 text-sm font-medium text-contrast transition-colors hover:border-brand-500/60"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </main>
    );
  }
}
