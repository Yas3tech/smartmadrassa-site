import { useRef } from 'react';
import { Sprout, Repeat, FileCheck2, Radar, Flag, Archive, type LucideIcon } from 'lucide-react';
import { YEAR } from '../../content/site';
import { cn } from '../../lib/utils';
import { gsap, useGsap } from '../../lib/gsap';
import { Eyebrow } from '../ui/primitives';

const ICONS: Record<string, LucideIcon> = {
  sprout: Sprout,
  repeat: Repeat,
  'file-check': FileCheck2,
  radar: Radar,
  flag: Flag,
  archive: Archive,
};

const ACCENT: Record<string, { ring: string; text: string; bar: string; halo: string }> = {
  brand: {
    ring: 'ring-brand-500/25 bg-brand-500/[0.08]',
    text: 'text-accent',
    bar: 'from-brand-500 to-brand-300',
    halo: 'bg-brand-500/15',
  },
  jade: {
    ring: 'ring-jade-500/25 bg-jade-500/[0.08]',
    text: 'text-success',
    bar: 'from-jade-600 to-jade-300',
    halo: 'bg-jade-500/15',
  },
  violet: {
    ring: 'ring-violet-500/25 bg-violet-500/[0.08]',
    text: 'text-status-violet',
    bar: 'from-violet-600 to-violet-300',
    halo: 'bg-violet-500/15',
  },
  sky: {
    ring: 'ring-sky-500/25 bg-sky-500/[0.08]',
    text: 'text-status-sky',
    bar: 'from-sky-600 to-sky-300',
    halo: 'bg-sky-500/15',
  },
};

function Card({ stop, index }: { stop: (typeof YEAR.stops)[number]; index: number }) {
  const Icon = ICONS[stop.icon] ?? Sprout;
  const a = ACCENT[stop.accent] ?? ACCENT.brand;

  return (
    <article
      data-card
      className="relative flex w-[78vw] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-contrast/[0.08] bg-gradient-to-b from-contrast/[0.05] to-contrast/[0.015] p-7 sm:w-[24rem] sm:p-8 lg:w-[26rem]"
    >
      <div aria-hidden className={cn('absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl', a.halo)} />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ring-1 ring-inset',
              a.ring,
              a.text,
            )}
          >
            {stop.period}
          </span>
          <span className="font-display text-xs font-bold text-contrast/15">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <span
          className={cn(
            'mt-7 grid h-11 w-11 place-items-center rounded-2xl ring-1 ring-inset',
            a.ring,
            a.text,
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>

        <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em] text-contrast sm:text-2xl">
          {stop.title}
        </h3>
        <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-slate-400">{stop.body}</p>

        <div className="mt-7 border-t border-contrast/[0.07] pt-5">
          <div className={cn('font-display text-2xl font-extrabold tracking-[-0.03em]', a.text)}>
            {stop.metric}
          </div>
          <div className="mt-0.5 text-xs text-slate-500">{stop.metricLabel}</div>
        </div>
      </div>
    </article>
  );
}

export function YearJourney() {
  const scope = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);

  const updateProgress = (progress: number) => {
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.max(progress, 0.02)})`;
    const step = String(Math.min(YEAR.stops.length, Math.floor(progress * YEAR.stops.length) + 1)).padStart(2, '0');
    if (stepRef.current && stepRef.current.textContent !== step) stepRef.current.textContent = step;
  };

  useGsap(
    () => {
      const mm = gsap.matchMedia();

      // Épinglage + translation horizontale : réservé aux grands écrans pointeur fin,
      // ailleurs le glissement natif avec accrochage est plus agréable.
      mm.add(
        '(min-width: 1024px) and (min-height: 800px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const track = trackRef.current;
          const section = scope.current;
          if (!track || !section) return;

          section.dataset.pinned = 'true';
          track.scrollLeft = 0;
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => updateProgress(self.progress),
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(track, { clearProps: 'x' });
            delete section.dataset.pinned;
            updateProgress(0);
          };
        },
      );

      return () => mm.revert();
    },
    scope,
    [],
  );

  return (
    <section ref={scope} id="annee" className="group/journey relative overflow-hidden py-20 data-[pinned=true]:overflow-visible data-[pinned=true]:py-0">
      {/* pt-24 : dégage le bandeau de navigation pendant l'épinglage */}
      <div className="group-data-[pinned=true]/journey:flex group-data-[pinned=true]/journey:h-screen group-data-[pinned=true]/journey:flex-col group-data-[pinned=true]/journey:justify-center group-data-[pinned=true]/journey:pt-24">
        <div className="container-x">
          <div className="max-w-2xl">
            <Eyebrow>{YEAR.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-[2.9rem]">
              {YEAR.title}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-slate-400">{YEAR.lead}</p>
          </div>
        </div>

        {/* Rail des cartes : translaté par GSAP en desktop, glissable au doigt en mobile */}
        <div className="relative mt-10 lg:mt-14">
          {/* Fondus latéraux : adoucissent les cartes coupées par le bord de l'écran */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-ink-950 to-transparent group-data-[pinned=true]/journey:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 bg-gradient-to-l from-ink-950 to-transparent group-data-[pinned=true]/journey:block"
          />
          <div
            ref={trackRef}
            tabIndex={0}
            role="region"
            aria-label="Les étapes de l’année scolaire"
            onScroll={(event) => {
              if (scope.current?.dataset.pinned) return;
              const track = event.currentTarget;
              const distance = track.scrollWidth - track.clientWidth;
              updateProgress(distance > 0 ? track.scrollLeft / distance : 0);
            }}
            className={cn(
              'flex gap-5 px-5 sm:px-8',
              'snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              'lg:pl-[max(2rem,calc((100vw-1200px)/2))] lg:pr-24',
              'group-data-[pinned=true]/journey:overflow-visible group-data-[pinned=true]/journey:pb-0',
            )}
          >
            {YEAR.stops.map((stop, i) => (
              <Card key={stop.title} stop={stop} index={i} />
            ))}
          </div>
        </div>

        {/* Jauge de progression du rail (desktop) */}
        <div aria-hidden className="container-x mt-10 hidden lg:block">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 overflow-hidden bg-contrast/[0.08]">
              <div
                ref={progressRef}
                className="h-full origin-left bg-gradient-to-r from-brand-500 to-jade-400 transition-none"
                style={{ transform: 'scaleX(0.02)' }}
              />
            </div>
            <span className="shrink-0 font-display text-xs font-semibold tabular-nums text-slate-500">
              <span ref={stepRef}>01</span>
              <span className="text-slate-700"> / {String(YEAR.stops.length).padStart(2, '0')}</span>
            </span>
          </div>
        </div>

        {/* Indice de glissement (mobile) */}
        <p className="container-x mt-4 text-xs text-slate-600 group-data-[pinned=true]/journey:hidden">
          Faites glisser pour parcourir l’année →
        </p>
      </div>
    </section>
  );
}
