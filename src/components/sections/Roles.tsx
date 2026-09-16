import { t } from '../../lib/i18n';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, GraduationCap, Users, BookOpen, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROLES } from '../../content/site';
import { cn } from '../../lib/utils';
import { EASE } from '../../lib/motion';
import { AppFrame, PhoneFrame } from '../mock/Frame';
import {
  DashboardScreen,
  AttendanceScreen,
  GradesScreen,
  PhoneAttendanceScreen,
} from '../mock/Screens';
import { SectionHeading } from '../ui/primitives';

const ICONS: Record<string, LucideIcon> = {
  building: Building2,
  graduation: GraduationCap,
  users: Users,
  book: BookOpen,
};

function RoleVisual({ id }: { id: string }) {
  if (id === 'direction') {
    return (
      <AppFrame compact active="dashboard" title={t("Tableau de bord")} subtitle={t("Vue direction")}>
        <DashboardScreen />
      </AppFrame>
    );
  }
  if (id === 'enseignant') {
    return (
      <AppFrame compact active="attendance" title={t("Appel & présences")} subtitle={t("Arabe — 3A, 09:00")}>
        <AttendanceScreen />
      </AppFrame>
    );
  }
  if (id === 'parent') {
    return (
      <AppFrame compact active="grades" title={t("Résultats d’Amina")} subtitle={t("Période 2 — 3A")}>
        <GradesScreen />
      </AppFrame>
    );
  }
  return (
    <div className="flex justify-center">
      <PhoneFrame>
        <PhoneAttendanceScreen />
      </PhoneFrame>
    </div>
  );
}

export function Roles() {
  const [active, setActive] = useState(ROLES[0].id);
  const role = ROLES.find((r) => r.id === active) ?? ROLES[0];

  return (
    <section id="roles" className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-brand-500/[0.07] blur-[120px]"
      />

      <div className="container-x relative z-10">
        <SectionHeading
          eyebrow={t("Pour qui")}
          title={
            <>{t("Un seul outil, ")}<span className="text-gradient">{t("quatre façons de s’en servir")}</span>
            </>
          }
          lead={t("Chaque profil n’accède qu’à ce qui le concerne. Personne ne se perd dans des écrans qui ne lui sont pas destinés.")}
        />

        {/* Onglets */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {ROLES.map((r) => {
            const Icon = ICONS[r.icon] ?? Users;
            const isActive = r.id === active;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActive(r.id)}
                aria-pressed={isActive}
                className={cn(
                  'relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'text-contrast' : 'text-slate-400 hover:text-slate-200',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="role-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-brand-500/30 bg-brand-500/[0.12]"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <Icon className="h-4 w-4" strokeWidth={1.9} />
                {r.name}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <h3 className="text-balance font-display text-2xl font-bold leading-[1.15] tracking-[-0.025em] text-contrast sm:text-3xl">
                {role.headline}
              </h3>
              <p className="mt-4 leading-relaxed text-slate-400">{role.body}</p>

              <ul className="mt-7 space-y-3">
                {role.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.08 + i * 0.06 }}
                    className="flex items-center gap-3 border-b border-contrast/[0.05] pb-3 last:border-0"
                  >
                    <ArrowRight className="icon-directional h-3.5 w-3.5 shrink-0 text-accent" />
                    <span className="text-sm text-slate-300">{p}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`visual-${role.id}`}
              initial={{ opacity: 0, scale: 0.97, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <RoleVisual id={role.id} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
