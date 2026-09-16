import { t } from '../../lib/i18n';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../content/site';
import { RevealGroup, RevealItem, SectionHeading } from '../ui/primitives';

/**
 * Section témoignages.
 * Masquée tant que `TESTIMONIALS` est vide — n'y placez que de vrais retours
 * d'écoles clientes, obtenus par écrit.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("Ils l’utilisent")}
          title={
            <>{t("Ce qu’en disent ")}<span className="text-gradient">{t("les écoles")}</span>
            </>
          }
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.author}>
              <figure className="card flex h-full flex-col p-7">
                <Quote className="mb-4 h-6 w-6 text-accent/50" />
                <blockquote className="flex-1 text-sm leading-relaxed text-slate-300">
                  « {t.quote} »
                </blockquote>
                <figcaption className="mt-6 border-t border-contrast/[0.07] pt-4">
                  <div className="text-sm font-semibold text-contrast">{t.author}</div>
                  <div className="text-xs text-slate-500">
                    {t.role} — {t.school}
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
