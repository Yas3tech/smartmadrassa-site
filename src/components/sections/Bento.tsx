import { t } from '../../lib/i18n';
import { Smartphone, Languages, Lock, FileDown, Zap, LifeBuoy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BENTO } from '../../content/site';
import { cn } from '../../lib/utils';
import { RevealGroup, RevealItem, SectionHeading, SpotlightCard } from '../ui/primitives';

const ICONS: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  languages: Languages,
  lock: Lock,
  'file-down': FileDown,
  zap: Zap,
  'life-buoy': LifeBuoy,
};

export function Bento() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("Ce qui change au quotidien")}
          title={
            <>{t("Les détails qui font qu’un outil")}{' '}
              <span className="text-gradient">{t("est réellement utilisé")}</span>
            </>
          }
          lead={t("Un logiciel scolaire ne tient pas à sa liste de fonctions, mais à la vitesse à laquelle un enseignant pressé arrive au bout de sa tâche.")}
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {BENTO.map((item) => {
            const Icon = ICONS[item.icon] ?? Zap;
            return (
              <RevealItem key={item.title} className={cn(item.span)}>
                <SpotlightCard className="h-full p-6 sm:p-7">
                  <span className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400/20 to-brand-600/10 text-accent ring-1 ring-inset ring-brand-400/20">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  </span>
                  <h3 className="font-display text-[17px] font-semibold leading-snug text-contrast">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
