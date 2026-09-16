import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Bell, Check } from 'lucide-react';
import { LANGUAGES } from '../../content/site';
import { cn } from '../../lib/utils';
import { EASE } from '../../lib/motion';
import { usePrefersReducedMotion } from '../../lib/hooks';
import { Reveal, SectionHeading } from '../ui/primitives';

/** Aperçu d'une notification, rejouée dans les trois langues. */
const PREVIEWS = [
  {
    code: 'FR',
    dir: 'ltr' as const,
    title: 'Bulletin disponible',
    body: 'Le bulletin de la période 2 d’Amina vient d’être publié.',
    action: 'Ouvrir le bulletin',
    meta: 'il y a 2 minutes',
    font: 'font-sans',
  },
  {
    code: 'NL',
    dir: 'ltr' as const,
    title: 'Rapport beschikbaar',
    body: 'Het rapport van periode 2 van Amina is zonet gepubliceerd.',
    action: 'Rapport openen',
    meta: '2 minuten geleden',
    font: 'font-sans',
  },
  {
    code: 'AR',
    dir: 'rtl' as const,
    title: 'بطاقة النقاط متاحة',
    body: 'تم نشر بطاقة نقاط أمينة الخاصة بالفصل الثاني.',
    action: 'فتح البطاقة',
    meta: 'منذ دقيقتين',
    font: 'font-arabic',
  },
];

export function Languages() {
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === 'visible');
  const previewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(previewRef, { amount: 0.5 });
  const reducedMotion = usePrefersReducedMotion();
  const cycling = inView && pageVisible && !reducedMotion && !interacted && !hovered;

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!cycling) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % PREVIEWS.length), 3200);
    return () => clearInterval(id);
  }, [cycling]);

  const selectLanguage = (nextIndex: number) => {
    setInteracted(true);
    setIndex(nextIndex);
  };

  const current = PREVIEWS[index];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/4 h-[28rem] w-[28rem] rounded-full bg-jade-500/[0.08] blur-[120px]"
      />

      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow={LANGUAGES.eyebrow}
            title={
              <>
                Chaque famille <span className="text-gradient">dans sa langue</span>
              </>
            }
            lead={LANGUAGES.lead}
          />

          <Reveal delay={0.15} className="mt-9 space-y-2.5">
            {LANGUAGES.items.map((item, i) => (
              <button
                key={item.code}
                type="button"
                aria-pressed={index === i}
                aria-controls="language-preview"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => selectLanguage(i)}
                onClick={() => selectLanguage(i)}
                className={cn(
                  'flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-300 motion-reduce:transition-none',
                  index === i
                    ? 'border-brand-500/30 bg-brand-500/[0.07]'
                    : 'border-contrast/[0.07] bg-contrast/[0.015] hover:border-contrast/15',
                )}
              >
                <span
                  className={cn(
                    'grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[11px] font-bold transition-colors',
                    index === i ? 'bg-brand-500 text-white' : 'bg-contrast/[0.06] text-slate-400',
                  )}
                >
                  {item.code}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-contrast">{item.label}</span>
                  <span
                    dir={item.dir}
                    className={cn(
                      'block truncate text-xs text-slate-500',
                      item.dir === 'rtl' && 'font-arabic text-right',
                    )}
                  >
                    {item.sample}
                  </span>
                </span>
                {item.dir === 'rtl' && (
                  <span className="shrink-0 rounded-md border border-jade-500/25 bg-jade-500/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                    RTL
                  </span>
                )}
              </button>
            ))}
          </Reveal>
        </div>

        {/* Aperçu animé */}
        <Reveal delay={0.1} className="relative">
          <div ref={previewRef} className="relative mx-auto max-w-md">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-500/15 via-transparent to-jade-500/15 blur-2xl"
            />
            <div className="card p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                <Bell className="h-3.5 w-3.5 text-accent" />
                Notification envoyée au parent
              </div>

              <div id="language-preview" className="relative min-h-[170px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.code}
                    dir={current.dir}
                    initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: reducedMotion ? 0 : 0.45, ease: EASE }}
                    className={cn(
                      'rounded-2xl border border-contrast/[0.08] bg-ink-900 p-4',
                      current.font,
                      current.dir === 'rtl' && 'text-right',
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center gap-2.5',
                        current.dir === 'rtl' && 'flex-row-reverse',
                      )}
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-white">
                        <Bell className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-contrast">{current.title}</div>
                        <div className="text-[11px] text-slate-500">{current.meta}</div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{current.body}</p>

                    <div
                      className={cn(
                        'mt-4 flex items-center gap-2',
                        current.dir === 'rtl' && 'flex-row-reverse',
                      )}
                    >
                      <span className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white">
                        {current.action}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-success">
                        <Check className="h-3 w-3" strokeWidth={3} /> smartmadrassa.be
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Barre de progression du cycle */}
              <div aria-hidden className="mt-4 flex gap-1.5">
                {PREVIEWS.map((p, i) => (
                  <span key={p.code} className="h-0.5 flex-1 overflow-hidden rounded-full bg-contrast/[0.08]">
                    {i === index && (
                      <motion.span
                        key={`${p.code}-${cycling}`}
                        className="block h-full origin-left bg-brand-400"
                        initial={cycling ? { scaleX: 0 } : false}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: cycling ? 3.2 : 0, ease: 'linear' }}
                      />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
