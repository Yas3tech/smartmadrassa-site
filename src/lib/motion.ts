import type { Transition, Variants } from 'framer-motion';

/** Courbe maison : démarrage franc, sortie très douce. */
export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const spring: Transition = { type: 'spring', stiffness: 260, damping: 32, mass: 0.9 };
export const springSoft: Transition = { type: 'spring', stiffness: 140, damping: 24 };

/** Conteneur qui décale l'apparition de ses enfants. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Montée douce avec léger flou — la brique de base des révélations. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

export const slideFrom = (dir: 'left' | 'right' = 'left', distance = 40): Variants => ({
  hidden: { opacity: 0, x: dir === 'left' ? -distance : distance },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
});

/** Révélation ligne par ligne d'un titre, via masque overflow. */
export const lineMask: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease: EASE } },
};

export const viewportOnce = { once: true, amount: 0.25 } as const;
export const viewportEarly = { once: true, amount: 0.1 } as const;
