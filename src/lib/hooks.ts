import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger, registerLenis, unregisterLenis } from './gsap';

/** Retourne true si l'utilisateur a demandé à réduire les animations. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * Défilement inertiel (Lenis). Désactivé si l'utilisateur réduit les animations
 * ou sur écran tactile, où le scroll natif est meilleur.
 */
export function useSmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // Sans Lenis (tactile ou animations réduites), ScrollTrigger suit le scroll natif.
    if (reduced || window.matchMedia('(pointer: coarse)').matches) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    // Une seule horloge pour Lenis et GSAP, sinon les sections épinglées saccadent.
    lenis.on('scroll', ScrollTrigger.update);
    registerLenis((timeMs) => lenis.raf(timeMs));
    ScrollTrigger.refresh();

    // Les ancres #section passent par Lenis pour garder l'inertie.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -88 });
      history.replaceState(null, '', url.hash);
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      unregisterLenis();
      lenis.destroy();
    };
  }, [reduced]);
}

/** Attire doucement un élément vers le curseur (boutons « magnétiques »). */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      target.y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [strength, reduced]);

  return ref;
}

/**
 * Halo radial qui suit le curseur sur une carte.
 * Écrit --mx / --my en pourcentage, exploités par un dégradé CSS.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return ref;
}

/** Vrai dès que la page a défilé au-delà du seuil (header collant). */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/** Section actuellement à l'écran, pour surligner la navigation. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
