import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  CalendarCheck,
  ShieldCheck,
  Users,
  CreditCard,
  GraduationCap,
  Printer,
  HeartPulse,
} from 'lucide-react';
import { t, localizedHref } from '../../lib/i18n';
import { cn } from '../../lib/utils';
import { EASE, riseIn, stagger, viewportOnce } from '../../lib/motion';
import { Aurora, Button, Eyebrow, GridBackdrop, SpotlightCard } from '../ui/primitives';
import { SITE } from '../../content/site';

export interface ContentPageProps {
  slug: string;
  category: string;
  categoryHref?: string;
  title: string;
  lead: string;
  badge?: string;
  icon?: 'attendance' | 'grades' | 'badges' | 'health' | 'finance' | 'parents' | 'shield' | 'general';
  metrics?: {
    value: string;
    label: string;
    sub?: string;
  }[];
  highlights?: {
    title: string;
    description: string;
    badge?: string;
    points?: string[];
  }[];
  workflow?: {
    step: string;
    title: string;
    description: string;
  }[];
  comparison?: {
    beforeTitle: string;
    beforeItems: string[];
    afterTitle: string;
    afterItems: string[];
  };
  faq?: {
    q: string;
    a: string;
  }[];
  related?: {
    slug: string;
    title: string;
    category: string;
    description: string;
  }[];
  ctaTitle?: string;
  ctaLead?: string;
  children?: ReactNode;
}

const ICONS = {
  attendance: CalendarCheck,
  grades: GraduationCap,
  badges: Printer,
  health: HeartPulse,
  finance: CreditCard,
  parents: Users,
  shield: ShieldCheck,
  general: Sparkles,
};

export function ContentPageLayout({
  category,
  categoryHref,
  title,
  lead,
  badge,
  icon = 'general',
  metrics = [],
  highlights = [],
  workflow = [],
  comparison,
  faq = [],
  related = [],
  ctaTitle,
  ctaLead,
  children,
}: ContentPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const IconComponent = ICONS[icon] ?? Sparkles;

  return (
    <main className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <Aurora variant="soft" />
      <GridBackdrop />

      <div className="container-x relative z-10">
        {/* Fil d'Ariane */}
        <nav aria-label={t("Fil d'Ariane")} className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
          <Link
            to={localizedHref('/')}
            className="transition-colors hover:text-contrast"
          >
            {t('Accueil')}
          </Link>
          <ChevronRight className="icon-directional h-3.5 w-3.5 text-slate-600" />
          {categoryHref ? (
            <Link
              to={localizedHref(categoryHref)}
              className="transition-colors hover:text-contrast"
            >
              {category}
            </Link>
          ) : (
            <span className="text-slate-500">{category}</span>
          )}
          <ChevronRight className="icon-directional h-3.5 w-3.5 text-slate-600" />
          <span className="truncate text-contrast" aria-current="page">{title}</span>
        </nav>

        {/* Hero de page */}
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>{category}</Eyebrow>
            {badge && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/[0.08] px-3 py-0.5 text-xs font-semibold text-brand-400">
                <IconComponent className="h-3.5 w-3.5" />
                {badge}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-balance font-display text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-6 text-pretty text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed">
            {lead}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="#contact" variant="primary" size="lg" magnetic>
              {t("Demander une démo")}
              <ArrowRight className="icon-directional h-4 w-4" />
            </Button>
            <Button href="/#plateforme" variant="outline" size="lg">
              {t("Découvrir la plateforme")}
            </Button>
          </div>
        </div>

        {/* Chiffres clés / métriques */}
        {metrics.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger(0.08, 0.1)}
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {metrics.map((m) => (
              <motion.div key={m.label} variants={riseIn}>
                <SpotlightCard className="flex h-full flex-col justify-between p-6">
                  <div>
                    <div className="font-display text-3xl font-extrabold tracking-tight text-contrast sm:text-4xl">
                      {m.value}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-slate-200">{m.label}</div>
                  </div>
                  {m.sub && <div className="mt-3 text-xs leading-relaxed text-slate-400">{m.sub}</div>}
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Points forts / Avantages concrets */}
        {highlights.length > 0 && (
          <div className="mt-20 sm:mt-28">
            <div className="max-w-2xl">
              <Eyebrow>{t("Atouts concrets")}</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {t("Pensé pour le terrain, validé par l'expérience")}
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {highlights.map((item) => (
                <SpotlightCard key={item.title} className="flex flex-col justify-between p-7">
                  <div>
                    {item.badge && (
                      <span className="mb-4 inline-block rounded-md border border-contrast/10 bg-contrast/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                        {item.badge}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-bold text-contrast">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
                  </div>

                  {item.points && item.points.length > 0 && (
                    <ul className="mt-6 space-y-2 border-t border-contrast/[0.07] pt-4">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </SpotlightCard>
              ))}
            </div>
          </div>
        )}

        {/* Workflow / Déroulement */}
        {workflow.length > 0 && (
          <div className="mt-20 sm:mt-28 rounded-3xl border border-contrast/[0.08] bg-contrast/[0.015] p-8 sm:p-12">
            <div className="max-w-2xl">
              <Eyebrow>{t("Comment ça se passe")}</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {t("Simple à mettre en place, instantané à utiliser")}
              </h2>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {workflow.map((w, idx) => (
                <div key={w.step} className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/10 font-display text-sm font-bold text-brand-400">
                    {idx + 1}
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-contrast">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{w.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparatif Avant / Avec SmartMadrassa */}
        {comparison && (
          <div className="mt-20 sm:mt-28">
            <div className="mb-10 text-center">
              <Eyebrow>{t("La différence au quotidien")}</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {t("Votre école gagne un temps précieux")}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-contrast/[0.08] bg-contrast/[0.02] p-7 sm:p-9">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {comparison.beforeTitle}
                </div>
                <ul className="mt-6 space-y-3.5">
                  {comparison.beforeItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger/10 text-danger text-xs font-bold">
                        ✕
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-jade-500/25 bg-jade-500/[0.04] p-7 sm:p-9">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-jade-500/15 blur-3xl"
                />
                <div className="relative z-10">
                  <div className="text-xs font-semibold uppercase tracking-wider text-success">
                    {comparison.afterTitle}
                  </div>
                  <ul className="mt-6 space-y-3.5">
                    {comparison.afterItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-jade-500/20 text-success text-xs font-bold">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenu personnalisé additionnel */}
        {children && <div className="mt-20">{children}</div>}

        {/* FAQ spécifique à la page */}
        {faq.length > 0 && (
          <div className="mt-20 sm:mt-28 max-w-3xl">
            <Eyebrow>{t("Questions fréquentes")}</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {t("Tout ce que vous devez savoir")}
            </h2>

            <div className="mt-8 space-y-3">
              {faq.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={item.q}
                    className="overflow-hidden rounded-2xl border border-contrast/[0.08] bg-contrast/[0.02] transition-colors hover:border-contrast/15"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-semibold text-contrast sm:text-base"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200',
                          isOpen && 'rotate-180 text-contrast',
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                        >
                          <div className="border-t border-contrast/[0.06] p-5 pt-3 text-sm leading-relaxed text-slate-400">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bannière Call To Action */}
        <div className="mt-24 relative overflow-hidden rounded-3xl border border-brand-500/25 bg-gradient-to-br from-brand-950/60 via-ink-950 to-ink-900 p-8 sm:p-12 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/20 via-transparent to-transparent"
          />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-contrast sm:text-3xl">
              {ctaTitle ?? t("Prêt à transformer le quotidien de votre école ?")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {ctaLead ??
                t("Réservez une démonstration personnalisée de 30 minutes avec Yassine E. Sans engagement, avec vos propres données.")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <Button href="/#contact" variant="primary" size="lg" magnetic>
                {t("Réserver une démo")}
                <ArrowRight className="icon-directional h-4 w-4" />
              </Button>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 underline underline-offset-4 hover:text-contrast"
              >
                {t("Poser une question par e-mail")}
              </a>
            </div>
          </div>
        </div>

        {/* Liens connexes */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-contrast/[0.08] pt-12">
            <div className="mb-6 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t("Découvrez aussi")}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={localizedHref(`/${rel.slug}`)}
                  className="group rounded-2xl border border-contrast/[0.07] bg-contrast/[0.015] p-5 transition-all hover:border-contrast/20 hover:bg-contrast/[0.03]"
                >
                  <div className="text-[11px] font-semibold text-accent">{rel.category}</div>
                  <div className="mt-1 font-display text-base font-bold text-contrast group-hover:text-brand-400 transition-colors">
                    {rel.title}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
                    {rel.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
