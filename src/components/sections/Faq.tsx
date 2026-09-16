import { t } from '../../lib/i18n';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, MessagesSquare } from 'lucide-react';
import { FAQ, SITE } from '../../content/site';
import { cn } from '../../lib/utils';
import { EASE, viewportOnce } from '../../lib/motion';
import { SectionHeading } from '../ui/primitives';

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <script
        type="application/ld+json"
        // Balisage FAQ pour les moteurs de recherche.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow={t("Questions fréquentes")}
              title={
                <>{t("Ce qu’on me demande ")}<span className="text-gradient">{t("avant de se lancer")}</span>
                </>
              }
              lead={t("Une question qui n’est pas ici ? Écrivez-moi, je vous réponds sous deux jours ouvrables.")}
            />
            <a
              href={`mailto:${SITE.email}`}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-contrast/10 bg-contrast/[0.03] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-brand-500/30 hover:bg-brand-500/[0.08]"
            >
              <MessagesSquare className="h-4 w-4 text-accent" />
              {SITE.email}
            </a>
          </div>

          <div className="divide-y divide-contrast/[0.07] border-y border-contrast/[0.07]">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.55, ease: EASE, delay: Math.min(i, 5) * 0.05 }}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start gap-4 py-5 text-left"
                    >
                      <span
                        className={cn(
                          'flex-1 font-display text-[15px] font-semibold transition-colors sm:text-base',
                          isOpen ? 'text-contrast' : 'text-slate-300 group-hover:text-contrast',
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-300',
                          isOpen
                            ? 'rotate-45 border-brand-500/40 bg-brand-500/15 text-accent'
                            : 'border-contrast/10 text-slate-500 group-hover:border-contrast/25',
                        )}
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-slate-400">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
