import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { MODULES } from '../../content/site';
import { cn } from '../../lib/utils';
import { EASE, viewportOnce } from '../../lib/motion';
import { AppFrame } from '../mock/Frame';
import { SCREENS, SCREEN_META } from '../mock/Screens';
import { SectionHeading } from '../ui/primitives';

const ACCENT: Record<string, { text: string; ring: string; glow: string; dot: string }> = {
  brand: {
    text: 'text-accent',
    ring: 'ring-brand-500/25 bg-brand-500/[0.08]',
    glow: 'bg-brand-500/20',
    dot: 'bg-brand-400',
  },
  jade: {
    text: 'text-success',
    ring: 'ring-jade-500/25 bg-jade-500/[0.08]',
    glow: 'bg-jade-500/20',
    dot: 'bg-jade-400',
  },
  violet: {
    text: 'text-status-violet',
    ring: 'ring-violet-500/25 bg-violet-500/[0.08]',
    glow: 'bg-violet-500/20',
    dot: 'bg-violet-400',
  },
  sky: {
    text: 'text-status-sky',
    ring: 'ring-sky-500/25 bg-sky-500/[0.08]',
    glow: 'bg-sky-500/20',
    dot: 'bg-sky-400',
  },
};

function ModuleScreen({ index }: { index: number }) {
  const mod = MODULES[index];
  const meta = SCREEN_META[mod.mock];
  const Screen = SCREENS[mod.mock];
  return (
    <AppFrame active={meta.nav} title={meta.title} subtitle={meta.subtitle}>
      <Screen />
    </AppFrame>
  );
}

export function Showcase() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(idx)) setActive(idx);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.3, 0.6, 1] },
    );
    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const accent = ACCENT[MODULES[active].accent];

  return (
    <section id="modules" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Les modules"
          title={
            <>
              Cinq modules qui couvrent{' '}
              <span className="text-gradient">toute l’année scolaire</span>
            </>
          }
          lead="De la rentrée au dernier bulletin : rien à brancher entre eux, tout partage la même base d’élèves, de classes et de périodes."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-16">
          {/* Colonne texte (mobile : maquette intercalée) */}
          <div className="order-2 lg:order-1">
            {MODULES.map((mod, i) => {
              const a = ACCENT[mod.accent];
              const isActive = i === active;
              return (
                <div
                  key={mod.id}
                  data-index={i}
                  ref={(el) => {
                    blockRefs.current[i] = el;
                  }}
                  className="border-b border-contrast/[0.06] py-12 last:border-0 lg:min-h-[76vh] lg:flex lg:flex-col lg:justify-center lg:border-0 lg:py-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.75, ease: EASE }}
                    className={cn(
                      'transition-opacity duration-500',
                      'lg:opacity-40',
                      isActive && 'lg:opacity-100',
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset',
                        a.ring,
                        a.text,
                      )}
                    >
                      <span className={cn('h-1.5 w-1.5 rounded-full', a.dot)} />
                      {mod.eyebrow}
                    </span>

                    <h3 className="mt-5 text-balance font-display text-2xl font-bold leading-[1.15] tracking-[-0.025em] text-contrast sm:text-[2rem]">
                      {mod.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-pretty leading-relaxed text-slate-400">
                      {mod.description}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {mod.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <span
                            className={cn(
                              'mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ring-1 ring-inset',
                              a.ring,
                              a.text,
                            )}
                          >
                            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                          </span>
                          <span className="text-sm leading-relaxed text-slate-300">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Maquette en flux, uniquement sur petit écran */}
                    <div className="mt-8 lg:hidden">
                      <ModuleScreen index={i} />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Colonne maquette collante (desktop) */}
          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-24">
              <div className="relative">
                <motion.div
                  aria-hidden
                  key={`glow-${active}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className={cn(
                    'pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] blur-[90px]',
                    accent.glow,
                  )}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={MODULES[active].id}
                    initial={{ opacity: 0, y: 18, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14, scale: 0.99 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <ModuleScreen index={active} />
                  </motion.div>
                </AnimatePresence>

                {/* Indicateur de progression vertical */}
                <div className="absolute -left-10 top-1/2 flex -translate-y-1/2 flex-col gap-2.5">
                  {MODULES.map((m, i) => (
                    <span
                      key={m.id}
                      className={cn(
                        'w-1 rounded-full transition-all duration-500',
                        i === active ? 'h-7 bg-brand-400' : 'h-3 bg-contrast/15',
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
