import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, type RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

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
