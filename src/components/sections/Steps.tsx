import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { STEPS } from '../../content/site';
import { EASE, viewportOnce } from '../../lib/motion';
import { SectionHeading } from '../ui/primitives';

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <section id="demarrage" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Mise en route"
          title={
            <>
              Opérationnel en <span className="text-gradient">deux à trois semaines</span>
            </>
          }
          lead="Je reprends vos fichiers existants et je configure la plateforme avec vous. Puis j’accompagne votre équipe dans sa prise en main."
        />

        <div ref={ref} className="relative mt-16 pl-12 sm:pl-16">
          {/* Rail vertical */}
          <div aria-hidden className="absolute left-[15px] top-2 h-[calc(100%-3rem)] w-px bg-contrast/[0.08] sm:left-[23px]">
            <motion.div
              style={{ scaleY }}
              className="h-full w-full origin-top bg-gradient-to-b from-brand-400 via-brand-500 to-jade-500"
            />
          </div>

          <div className="space-y-12 sm:space-y-14">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.75, ease: EASE, delay: i * 0.06 }}
                className="relative"
              >
                {/* Pastille sur le rail */}
                <span className="absolute -left-12 top-0.5 grid h-8 w-8 place-items-center rounded-full border border-contrast/10 bg-ink-900 font-display text-[11px] font-bold text-accent shadow-[0_0_24px_rgba(249,115,22,.25)] sm:-left-16 sm:h-12 sm:w-12 sm:text-[13px]">
                  {step.n}
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-contrast sm:text-[1.4rem]">
                    {step.title}
                  </h3>
                  <span className="rounded-full border border-contrast/[0.08] bg-contrast/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
                    {step.duration}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-slate-400">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
