import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { PRICING } from '../../content/site';
import { cn } from '../../lib/utils';
import { EASE } from '../../lib/motion';
import { Button, RevealGroup, RevealItem, SectionHeading } from '../ui/primitives';

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="tarifs" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={PRICING.eyebrow} title={PRICING.title} lead={PRICING.lead} />

        {/* Bascule mensuel / annuel */}
        <div className="mt-10 flex justify-center">
          <div
            role="group"
            aria-label="Périodicité de facturation"
            className="relative inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
          >
            {[
              { id: 'monthly', label: 'Mensuel' },
              { id: 'yearly', label: 'Annuel' },
            ].map((opt) => {
              const isActive = (opt.id === 'yearly') === yearly;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setYearly(opt.id === 'yearly')}
                  aria-pressed={isActive}
                  className={cn(
                    'relative rounded-full px-5 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pricing-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-brand-400 to-brand-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {opt.label}
                </button>
              );
            })}
            <span className="ml-1 mr-2 hidden rounded-full bg-jade-500/15 px-2 py-0.5 text-[11px] font-semibold text-jade-300 sm:inline">
              −20 %
            </span>
          </div>
        </div>

        <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3" gap={0.09}>
          {PRICING.plans.map((plan) => {
            const price = yearly ? plan.priceYearly : plan.priceMonthly;
            return (
              <RevealItem key={plan.id} className={cn(plan.highlighted && 'lg:-mt-4 lg:mb-[-1rem]')}>
                <div
                  className={cn(
                    'relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 sm:p-8',
                    plan.highlighted
                      ? 'border-brand-500/35 bg-gradient-to-b from-brand-500/[0.12] via-ink-900 to-ink-900 shadow-[0_30px_90px_-40px_rgba(249,115,22,.6)]'
                      : 'border-white/[0.08] bg-white/[0.015]',
                  )}
                >
                  {plan.highlighted && (
                    <>
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-brand-500/20 blur-3xl"
                      />
                      <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        <Sparkles className="h-3 w-3" /> Recommandé
                      </span>
                    </>
                  )}

                  <div className="relative z-10 flex h-full flex-col">
                    <h3 className="font-display text-lg font-bold text-white">{plan.name}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-300/80">
                      {plan.cap}
                    </p>

                    <div className="mt-6 flex min-h-[3.75rem] items-end gap-1.5">
                      {price === null ? (
                        <span className="font-display text-3xl font-extrabold tracking-[-0.03em] text-white">
                          Sur mesure
                        </span>
                      ) : (
                        <>
                          <AnimatePresence mode="popLayout">
                            <motion.span
                              key={price}
                              initial={{ y: 14, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -14, opacity: 0 }}
                              transition={{ duration: 0.28, ease: EASE }}
                              className="font-display text-5xl font-extrabold leading-none tracking-[-0.04em] text-white"
                            >
                              {price}
                            </motion.span>
                          </AnimatePresence>
                          <span className="pb-1 font-display text-2xl font-bold text-white">€</span>
                          <span className="pb-1.5 text-sm text-slate-500">/ mois</span>
                        </>
                      )}
                    </div>
                    <p className="mt-1 h-4 text-[11px] text-slate-600">
                      {price !== null && yearly ? 'facturé annuellement' : price !== null ? 'sans engagement' : ''}
                    </p>

                    <p className="mt-5 text-sm leading-relaxed text-slate-400">{plan.pitch}</p>

                    <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-6">
                      {plan.features.map((f, i) => {
                        const isHeading = f.endsWith(':');
                        return (
                          <li
                            key={f}
                            className={cn(
                              'flex items-start gap-2.5 text-sm',
                              isHeading ? 'text-slate-500' : 'text-slate-300',
                            )}
                          >
                            {!isHeading && (
                              <Check
                                className={cn(
                                  'mt-0.5 h-3.5 w-3.5 shrink-0',
                                  plan.highlighted ? 'text-brand-400' : 'text-jade-400',
                                )}
                                strokeWidth={3}
                              />
                            )}
                            <span className={cn(isHeading && i === 0 && 'text-xs font-semibold uppercase tracking-wide')}>
                              {f}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-8 pt-2">
                      <Button
                        href="#contact"
                        variant={plan.highlighted ? 'primary' : 'outline'}
                        size="lg"
                        className="w-full"
                      >
                        {plan.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-slate-600">
          {PRICING.note}
        </p>
      </div>
    </section>
  );
}
