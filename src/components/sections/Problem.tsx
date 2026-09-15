import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { PROBLEM } from '../../content/site';
import { EASE, viewportOnce } from '../../lib/motion';
import { SectionHeading } from '../ui/primitives';

function Column({
  label,
  items,
  tone,
}: {
  label: string;
  items: readonly string[];
  tone: 'muted' | 'bright';
}) {
  const bright = tone === 'bright';
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: EASE, delay: bright ? 0.12 : 0 }}
      className={
        bright
          ? 'relative overflow-hidden rounded-3xl border border-jade-500/20 bg-gradient-to-b from-jade-500/[0.07] to-transparent p-6 sm:p-8'
          : 'relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8'
      }
    >
      {bright && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-jade-500/15 blur-3xl"
        />
      )}
      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-2.5">
          <span
            className={
              bright
                ? 'grid h-7 w-7 place-items-center rounded-lg bg-jade-500/20 text-jade-300'
                : 'grid h-7 w-7 place-items-center rounded-lg bg-white/[0.05] text-slate-500'
            }
          >
            {bright ? <Check className="h-4 w-4" strokeWidth={3} /> : <X className="h-4 w-4" strokeWidth={3} />}
          </span>
          <h3
            className={
              bright
                ? 'font-display text-base font-semibold text-white'
                : 'font-display text-base font-semibold text-slate-400'
            }
          >
            {label}
          </h3>
        </div>

        <ul className="space-y-3.5">
          {items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: bright ? 14 : -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, ease: EASE, delay: 0.15 + i * 0.07 }}
              className="flex gap-3"
            >
              <span
                aria-hidden
                className={
                  bright
                    ? 'mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-jade-400'
                    : 'mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700'
                }
              />
              <span className={bright ? 'text-sm leading-relaxed text-slate-200' : 'text-sm leading-relaxed text-slate-500'}>
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Problem() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={PROBLEM.eyebrow} title={PROBLEM.title} lead={PROBLEM.lead} />

        <div className="relative mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Column label={PROBLEM.before.label} items={PROBLEM.before.items} tone="muted" />
          <Column label={PROBLEM.after.label} items={PROBLEM.after.items} tone="bright" />

          {/* Flèche de bascule entre les deux colonnes */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink-900 text-brand-400 shadow-[0_0_40px_rgba(249,115,22,.35)] lg:grid"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
