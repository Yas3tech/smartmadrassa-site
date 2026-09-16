import { t } from '../../lib/i18n';
import { useRef } from 'react';
import { Sprout, Repeat, FileCheck2, Radar, Flag, Archive, ArrowLeft, ArrowRight, type LucideIcon } from 'lucide-react';
import { YEAR } from '../../content/site';
import { cn } from '../../lib/utils';
import { gsap, ScrollTrigger, useGsap } from '../../lib/gsap';
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
      dir="auto"
      className={cn(
        'relative flex shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-contrast/[0.08]',
        'bg-gradient-to-b from-contrast/[0.05] to-contrast/[0.015]',
        // Largeur : presque pleine sur téléphone, deux cartes sur tablette, trois sur grand écran.
        'w-[min(82vw,22rem)] p-6 sm:w-[20rem] sm:p-7 md:w-[21rem] lg:w-[24rem] xl:w-[26rem]',
        // Épinglé : on resserre pour que la carte entière tienne dans la hauteur de la fenêtre.
        'group-data-[pinned=true]/journey:p-6',
      )}
    >
      <div aria-hidden className={cn('pointer-events-none absolute -end-16 -top-16 h-44 w-44 rounded-full blur-3xl', a.halo)} />

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
            'mt-6 grid h-11 w-11 place-items-center rounded-2xl ring-1 ring-inset group-data-[pinned=true]/journey:mt-4',
            a.ring,
            a.text,
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>

        <h3 className="mt-5 font-display text-lg font-bold tracking-[-0.02em] text-contrast sm:text-xl lg:text-2xl group-data-[pinned=true]/journey:mt-4">
          {stop.title}
        </h3>
        <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-slate-400">{stop.body}</p>

        <div className="mt-6 border-t border-contrast/[0.07] pt-5 group-data-[pinned=true]/journey:mt-4 group-data-[pinned=true]/journey:pt-4">
          <div className={cn('font-display text-2xl font-extrabold tracking-[-0.03em]', a.text)}>
            {stop.metric}
          </div>
          <div className="mt-0.5 text-xs text-slate-500">{stop.metricLabel}</div>
        </div>
      </div>
    </article>
  );
}

/**
 * Parcours de l'année scolaire.
 *
 * Dès la tablette, la section s'épingle au centre de l'écran et le défilement
 * vertical fait avancer le rail latéralement : l'année défile d'elle-même, sans
 * que le visiteur ait à deviner qu'il peut glisser. Sur téléphone — et si
 * l'utilisateur limite les animations — on garde le glissement natif avec
 * accrochage, doublé d'une jauge et de deux flèches explicites.
 */
export function YearJourney() {
  const scope = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);
  const previousRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const currentStep = useRef(0);

  const updateProgress = (value: number) => {
    const progress = Math.max(0, Math.min(1, value));
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.max(progress, 0.02)})`;
    currentStep.current = Math.round(progress * (YEAR.stops.length - 1));
    const step = String(currentStep.current + 1).padStart(2, '0');
    if (stepRef.current && stepRef.current.textContent !== step) stepRef.current.textContent = step;
    if (previousRef.current) previousRef.current.disabled = progress <= 0.001;
    if (nextRef.current) nextRef.current.disabled = progress >= 0.999;
  };

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.max(0, Math.min(YEAR.stops.length - 1, currentStep.current + direction));
    const progress = index / (YEAR.stops.length - 1);
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    const trigger = triggerRef.current;
    if (trigger) {
      // Épinglé : avancer d'une carte revient à avancer dans le défilement vertical.
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior });
    } else {
      track.scrollTo({ left: (track.scrollWidth - track.clientWidth) * progress, behavior });
    }
  };

  useGsap(
    () => {
      const mm = gsap.matchMedia();

      // Épinglage + translation horizontale dès la tablette : il faut assez de
      // hauteur pour que la carte tienne en entier une fois la section figée.
      mm.add(
        '(min-width: 768px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)',
        () => {
          const track = trackRef.current;
          const section = scope.current;
          const viewport = viewportRef.current;
          if (!track || !section || !viewport) return;

          section.dataset.pinned = 'true';
          track.scrollLeft = 0;
          // On mesure contre la fenêtre découpée, jamais contre window.innerWidth :
          // sur mobile et tablette, un rail qui dépasse élargit le viewport de mise
          // en page, et la course du défilement se réduirait à néant.
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

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
          triggerRef.current = tween.scrollTrigger ?? null;

          return () => {
            triggerRef.current = null;
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
    <section
      ref={scope}
      id="annee"
      className="group/journey relative overflow-hidden py-20 data-[pinned=true]:overflow-visible data-[pinned=true]:py-0"
    >
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

        {/* Rail des cartes : translaté par GSAP une fois épinglé, glissable au doigt sinon */}
        <div className="relative mt-8 sm:mt-10 lg:mt-12">
          {/* Fondus latéraux : adoucissent les cartes coupées par le bord de l'écran */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-ink-950 to-transparent group-data-[pinned=true]/journey:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 bg-gradient-to-l from-ink-950 to-transparent group-data-[pinned=true]/journey:block"
          />
          {/* Fenêtre découpée : le rail translaté ne doit jamais élargir la page. */}
          <div ref={viewportRef} className="overflow-hidden">
            <div
              ref={trackRef}
              id="parcours-annee"
              dir="ltr"
              tabIndex={0}
              role="region"
              aria-label={t('Les étapes de l’année scolaire')}
              onKeyDown={(event) => {
                if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
                event.preventDefault();
                move(event.key === 'ArrowLeft' ? -1 : 1);
              }}
              onScroll={(event) => {
                if (triggerRef.current) return;
                const track = event.currentTarget;
                const distance = track.scrollWidth - track.clientWidth;
                updateProgress(distance > 0 ? track.scrollLeft / distance : 0);
              }}
              className={cn(
                'flex gap-4 px-5 sm:gap-5 sm:px-8',
                'snap-x snap-mandatory overflow-x-auto pb-4 [scroll-padding-inline:1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                'lg:pl-[max(2rem,calc((100vw-1200px)/2))] lg:pr-24',
                'group-data-[pinned=true]/journey:overflow-visible group-data-[pinned=true]/journey:pb-0',
              )}
            >
              {YEAR.stops.map((stop, i) => (
                <Card key={stop.title} stop={stop} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Jauge de progression + commandes, sur tous les écrans : le visiteur voit
            qu'il reste des étapes même s'il ne pense pas à glisser. */}
        <div className="container-x mt-6 sm:mt-8">
          <div dir="ltr" className="flex items-center gap-3 sm:gap-5">
            <div aria-hidden className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-contrast/[0.08]">
              <div
                ref={progressRef}
                className="h-full origin-left rounded-full bg-gradient-to-r from-brand-500 to-jade-400"
                style={{ transform: 'scaleX(0.02)' }}
              />
            </div>
            <span className="shrink-0 font-display text-xs font-semibold tabular-nums text-slate-500">
              <span ref={stepRef}>01</span>
              <span> / {String(YEAR.stops.length).padStart(2, '0')}</span>
            </span>
            <div className="flex shrink-0 gap-2">
              <button
                ref={previousRef}
                type="button"
                disabled
                aria-label={t('Étape précédente')}
                aria-controls="parcours-annee"
                onClick={() => move(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-contrast/15 bg-ink-900 text-contrast transition-colors hover:border-brand-500/60 hover:text-accent disabled:cursor-default disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                ref={nextRef}
                type="button"
                aria-label={t('Étape suivante')}
                aria-controls="parcours-annee"
                onClick={() => move(1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-contrast/15 bg-ink-900 text-contrast transition-colors hover:border-brand-500/60 hover:text-accent disabled:cursor-default disabled:opacity-30"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-3 hidden text-xs text-slate-500 group-data-[pinned=true]/journey:block">
            {t('Continuez à faire défiler pour parcourir l’année.')}
          </p>
          <p className="mt-3 text-xs text-slate-500 group-data-[pinned=true]/journey:hidden">
            {t('Faites glisser les cartes ou utilisez les flèches pour parcourir l’année.')}
          </p>
        </div>
      </div>
    </section>
  );
}
