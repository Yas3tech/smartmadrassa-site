import { motion } from 'framer-motion';
import {
  Globe,
  ShieldCheck,
  Lock,
  KeyRound,
  ScrollText,
  Database,
  type LucideIcon,
} from 'lucide-react';
import { SECURITY } from '../../content/site';
import { EASE, viewportOnce } from '../../lib/motion';
import { RevealGroup, RevealItem, SectionHeading } from '../ui/primitives';

const ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  shield: ShieldCheck,
  lock: Lock,
  key: KeyRound,
  scroll: ScrollText,
  database: Database,
};

/** Bouclier tracé au scroll, avec anneaux concentriques. */
function ShieldSigil() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative mx-auto mb-10 grid h-24 w-24 place-items-center"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border border-jade-500/20"
          style={{
            inset: `${i * 12}px`,
            animation: `pulse-ring ${3 + i * 0.6}s cubic-bezier(.4,0,.6,1) infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-jade-500/25 to-jade-700/10 ring-1 ring-inset ring-jade-400/30">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-success" fill="none" strokeWidth="1.7">
          <motion.path
            d="M12 2.5 4.5 5.8v5.4c0 4.6 3.2 8.9 7.5 10.3 4.3-1.4 7.5-5.7 7.5-10.3V5.8z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          />
          <motion.path
            d="m8.8 12 2.3 2.3 4.1-4.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
          />
        </svg>
      </span>
    </motion.div>
  );
}

export function Security() {
  return (
    <section id="securite" className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-jade-500/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-jade-500/[0.07] blur-[120px]"
      />

      <div className="container-x relative z-10">
        <ShieldSigil />
        <SectionHeading eyebrow={SECURITY.eyebrow} title={SECURITY.title} lead={SECURITY.lead} />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {SECURITY.cards.map((card) => {
            const Icon = ICONS[card.icon] ?? ShieldCheck;
            return (
              <RevealItem key={card.title}>
                <div className="group h-full rounded-2xl border border-contrast/[0.07] bg-contrast/[0.015] p-6 transition-colors duration-300 hover:border-jade-500/25 hover:bg-jade-500/[0.03]">
                  <span className="mb-4 grid h-9 w-9 place-items-center rounded-lg bg-jade-500/10 text-success ring-1 ring-inset ring-jade-500/20">
                    <Icon className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                  <h3 className="font-display text-[15px] font-semibold text-contrast">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-slate-600"
        >
          Le détail des traitements, des durées de conservation et de vos droits figure dans la
          politique de confidentialité. Une convention de sous-traitance conforme à l’article 28 du
          RGPD est fournie à chaque établissement.
        </motion.p>
      </div>
    </section>
  );
}
