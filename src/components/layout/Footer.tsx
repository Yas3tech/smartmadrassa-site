import { t, localizedHref } from '../../lib/i18n';
import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { FOOTER, SITE } from '../../content/site';
import { analyticsDisponible } from '../../lib/analytics';
import { rouvrirConsentement } from './ConsentBanner';
import { Logo } from '../ui/Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-contrast/[0.07] bg-ink-950">
      {/* Signature typographique géante, en filigrane */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-1.5rem] select-none text-center font-display text-[11vw] font-extrabold leading-none tracking-[-0.06em] text-contrast/[0.022]"
      >
        SmartMadrassa
      </div>

      <div className="container-x relative z-10 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo size={38} />
            <p className="mt-5 text-sm leading-relaxed text-slate-400">{FOOTER.blurb}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" />
              {SITE.email}
            </a>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-jade-500/20 bg-jade-500/[0.06] px-3 py-1.5 text-[11px] font-medium text-success">
              <ShieldCheck className="h-3.5 w-3.5" />{t("Données hébergées dans l’Union européenne")}</div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {FOOTER.columns.map((col) => (
              <div key={col.title}>
                <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {col.title}
                </h2>
                {/* min-h : une cible confortable au doigt, sans casser le rythme vertical. */}
                <ul className="space-y-0.5">
                  {col.links.map((link) => {
                    const external = 'external' in link && link.external;
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a
                            href={localizedHref(link.href)}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group inline-flex min-h-[2rem] items-center gap-1 text-sm text-slate-400 transition-colors hover:text-contrast"
                          >
                            {link.label}
                            <ArrowUpRight className="icon-directional h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                          </a>
                        ) : link.href.startsWith('/#') ? (
                          <a
                            href={localizedHref(link.href)}
                            className="inline-flex min-h-[2rem] items-center text-sm text-slate-400 transition-colors hover:text-contrast"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            to={localizedHref(link.href)}
                            className="inline-flex min-h-[2rem] items-center text-sm text-slate-400 transition-colors hover:text-contrast"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-contrast/[0.07] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name} · {SITE.editor}, {SITE.country}.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{t("Conçu et développé en solo, en Belgique")}</span>
            {/* Retirer son consentement doit être aussi accessible que le donner. */}
            {analyticsDisponible && (
              <button
                type="button"
                onClick={rouvrirConsentement}
                className="inline-flex min-h-[2rem] items-center text-xs text-slate-500 underline underline-offset-2 transition-colors hover:text-contrast"
              >
                {t("Cookies de mesure d’audience")}
              </button>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
