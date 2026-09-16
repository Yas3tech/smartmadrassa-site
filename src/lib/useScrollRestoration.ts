import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Position de lecture au changement de route.
 *
 * React Router ne remonte pas la page de lui-même, et le navigateur fait pire :
 * il restaure la position qu'avait la page d'accueil avant qu'on la quitte.
 * Revenir sur l'accueil depuis une page légale atterrissait donc au milieu du
 * site, à l'endroit d'où l'on était parti — y compris en cliquant sur le logo.
 *
 * On reprend la main : `scrollRestoration = 'manual'` coupe la restauration
 * automatique, puis on remonte en haut à chaque changement de chemin. Une
 * ancre dans l'URL reste prioritaire : elle désigne un endroit précis, c'est
 * elle qu'il faut honorer.
 */
export function useScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (hash) {
      // L'élément visé peut n'être monté qu'au tour de rendu suivant.
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
}
