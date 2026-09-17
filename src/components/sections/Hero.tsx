import { t } from '../../lib/i18n';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Play, Bell, CalendarCheck2 } from 'lucide-react';
import { HERO, MARQUEE } from '../../content/site';
import { EASE } from '../../lib/motion';
import { usePrefersReducedMotion } from '../../lib/hooks';
import { Button, GridBackdrop, Marquee, MaskedLines } from '../ui/primitives';
import { ShaderBackdrop } from '../ui/ShaderBackdrop';
import { AppFrame, PhoneFrame } from '../mock/Frame';
import { DashboardScreen, PhoneAttendanceScreen } from '../mock/Screens';

/** Petite carte flottante qui gravite autour de la maquette. */
function FloatingCard({
  className,
  icon,
  title,
  body,
  delay,
}: {
  className: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={`pointer-events-none absolute z-20 hidden animate-float items-start gap-2.5 rounded-xl border border-contrast/10 bg-ink-850 p-3 shadow-device lg:flex ${className}`}
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-400/25 to-brand-600/25 text-accent ring-1 ring-inset ring-brand-400/25">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold text-contrast">{title}</span>
        <span className="block text-[10px] text-slate-400">{body}</span>
      </span>
    </motion.div>
  );
}

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start 85%', 'end 30%'],
  });

  // La maquette se « déplie » vers le lecteur au fil du scroll.
  const rotateX = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [26, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.88, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [56, 0]);
  const glow = useTransform(scrollYProgress, [0, 1], reduced ? [0.5, 0.5] : [0.25, 0.75]);

  return (
    <section id="plateforme" className="relative overflow-hidden pb-8 pt-32 sm:pt-40">
      <ShaderBackdrop className="[mask-image:linear-gradient(to_bottom,#000_0%,#000_55%,transparent_92%)]" />
      <GridBackdrop />

      <div className="container-x relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-jade-400 animate-pulse-ring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-jade-400" />
            </span>
            {HERO.badge}
          </motion.div>

          <h1 className="mt-7 max-w-full font-display text-[clamp(2rem,10vw,2.6rem)] font-extrabold leading-[1.03] tracking-[-0.045em] text-contrast sm:text-6xl lg:text-7xl">
            <MaskedLines
              lines={[
                HERO.titleLines[0],
                <>
                  {HERO.titleLines[1]}{' '}
                  <span className="relative inline-block">
                    <span className="text-gradient text-shadow-glow">{HERO.titleAccent}</span>
                    <motion.svg
                      viewBox="0 0 320 16"
                      className="absolute -bottom-1.5 left-0 h-3 w-full overflow-visible text-accent/70"
                      fill="none"
                      aria-hidden
                    >
                      <motion.path
                        d="M4 11.5C58 4.2 132 2.5 208 5.4c38 1.4 78 4 108 8.1"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.3, ease: EASE, delay: 0.95 }}
                      />
                    </motion.svg>
                  </span>
                </>,
              ]}
              delay={0.22}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-[17px]"
          >
            {HERO.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.74 }}
            className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <Button href={HERO.primaryCta.href} size="lg" magnetic className="w-full sm:w-auto">
              {HERO.primaryCta.label}
              <ArrowRight className="icon-directional h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
            <Button href="#modules" variant="outline" size="lg" className="w-full sm:w-auto">
              <Play className="h-3.5 w-3.5 fill-current" />
              {HERO.secondaryCta.label}
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {HERO.proofs.map((proof) => (
              <li key={proof} className="flex items-center gap-1.5 text-[13px] text-slate-500">
                <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
                {proof}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Scène : maquette bureau + téléphone */}
        <div ref={stageRef} className="perspective relative mt-16 sm:mt-20">
          <motion.div
            aria-hidden
            style={{ opacity: glow }}
            className="pointer-events-none absolute inset-x-[8%] top-10 -z-10 h-64 rounded-full bg-brand-500/25 blur-[100px]"
          />

          <FloatingCard
            className="-left-6 top-12 w-[15.5rem] xl:left-0"
            icon={<CalendarCheck2 className="h-3.5 w-3.5" />}
            title={t("Appel validé · 3A")}
            body={t("21 présents · 2 absents · 1 retard")}
            delay={1.25}
          />
          <FloatingCard
            className="-right-2 bottom-24 w-56 xl:right-4"
            icon={<Bell className="h-3.5 w-3.5" />}
            title={t("Note publiée")}
            body={t("Mme Benali a été notifiée par e-mail")}
            delay={1.45}
          />

          <motion.div
            style={{ rotateX, scale, y: translateY, transformPerspective: 1400 }}
            className="hidden origin-top sm:block"
          >
            <AppFrame
              active="dashboard"
              title={t("Tableau de bord")}
              subtitle={t("Vue direction · année 2025-2026")}
              className="mx-auto max-w-4xl"
            >
              <DashboardScreen />
            </AppFrame>
          </motion.div>

          <div className="flex justify-center sm:hidden">
            <PhoneFrame>
              <PhoneAttendanceScreen />
            </PhoneFrame>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            className="absolute -bottom-6 -right-6 z-20 hidden origin-bottom-right xl:block"
          >
            <PhoneFrame>
              <PhoneAttendanceScreen />
            </PhoneFrame>
          </motion.div>

          {/* Fondu bas pour fondre la maquette dans la page */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-1 hidden h-32 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent sm:block"
          />
        </div>
      </div>

      <div className="relative z-10 mt-16 border-y border-contrast/[0.06] bg-contrast/[0.012] py-4">
        <Marquee items={MARQUEE} duration={52} />
      </div>
    </section>
  );
}
