import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, type RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Le défilement inertiel de Lenis ne met pas à jour ScrollTrigger tout seul :
// `registerLenis` branche les deux (voir useSmoothScroll).
let lenisTicker: ((time: number) => void) | null = null;

export function registerLenis(raf: (timeMs: number) => void) {
  unregisterLenis();
  lenisTicker = (time: number) => raf(time * 1000);
  gsap.ticker.add(lenisTicker);
  gsap.ticker.lagSmoothing(0);
}

export function unregisterLenis() {
  if (lenisTicker) {
    gsap.ticker.remove(lenisTicker);
    lenisTicker = null;
  }
  gsap.ticker.lagSmoothing(500, 33);
}

/**
 * `useLayoutEffect` enveloppé dans un contexte GSAP : toutes les animations et
 * ScrollTriggers créés à l'intérieur sont nettoyés automatiquement au démontage.
 */
export function useGsap(
  setup: (ctx: gsap.Context) => void,
  scope: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(setup, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
