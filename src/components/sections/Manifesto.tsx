import { useRef } from 'react';
import { MANIFESTO } from '../../content/site';
import { gsap, useGsap } from '../../lib/gsap';
import { Eyebrow } from '../ui/primitives';

/**
 * Manifeste dont chaque mot s'allume au fil du défilement (ScrollTrigger en mode
 * « scrub » : la progression est pilotée par la molette, pas par une durée).
 */
export function Manifesto() {
  const scope = useRef<HTMLDivElement>(null);
  const words = MANIFESTO.text.split(' ');

  useGsap(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-word]');
      if (!targets.length) return;

      // Sans scrub : tout s'affiche, l'utilisateur ayant demandé moins d'animation.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(targets, { opacity: 1, filter: 'blur(0px)' });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0.12, filter: 'blur(2px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          stagger: 0.55,
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 72%',
            end: 'bottom 68%',
            scrub: 0.6,
          },
        },
      );
    },
    scope,
    [],
  );

  return (
    <section className="relative overflow-hidden py-24 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.06] blur-[130px]"
      />

      <div ref={scope} className="container-x relative z-10 max-w-4xl text-center">
        <Eyebrow>{MANIFESTO.eyebrow}</Eyebrow>

        <p className="mt-9 text-balance font-display text-2xl font-semibold leading-[1.35] tracking-[-0.025em] text-white sm:text-[2.1rem] sm:leading-[1.3]">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} data-word className="inline-block will-change-[opacity,filter]">
              {word}
              {i < words.length - 1 && ' '}
            </span>
          ))}
        </p>

        <p className="mt-10 text-sm text-slate-600">{MANIFESTO.signature}</p>
      </div>
    </section>
  );
}
