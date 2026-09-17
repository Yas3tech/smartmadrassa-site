import { t } from '../../lib/i18n';
import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  ClipboardCheck,
  GraduationCap,
  FileText,
  MessageSquare,
  Wallet,
  School,
  Users,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { LogoMark } from '../ui/Logo';

const NAV_ITEMS = [
  { id: 'dashboard', label: t("Tableau de bord"), Icon: LayoutDashboard },
  { id: 'attendance', label: t("Appel & présences"), Icon: ClipboardCheck },
  { id: 'grades', label: t("Notes"), Icon: GraduationCap },
  { id: 'bulletin', label: t("Bulletins"), Icon: FileText },
  { id: 'comms', label: t("Messages"), Icon: MessageSquare },
  { id: 'classes', label: t("Classes"), Icon: School },
  { id: 'users', label: t("Utilisateurs"), Icon: Users },
  { id: 'finance', label: t("Finances"), Icon: Wallet },
];

/**
 * Chrome d'application : barre de fenêtre, navigation latérale, en-tête.
 * `active` surligne l'entrée de menu correspondant à l'écran affiché.
 */
export function AppFrame({
  children,
  active = 'dashboard',
  title,
  subtitle,
  className,
  compact = false,
}: {
  children: ReactNode;
  active?: string;
  title: string;
  subtitle?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      // Reproduction en HTML d'une capture d'écran de l'application. Pour une
      // aide technique c'est une image, pas un document : role="img" fait
      // annoncer la description et taire le faux tableau qu'elle contient.
      role="img"
      aria-label={subtitle ? `${t('Aperçu de l’application')}, ${title} · ${subtitle}` : `${t('Aperçu de l’application')}, ${title}`}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-contrast/10 bg-ink-900',
        'shadow-window',
        className,
      )}
    >
      {/* Barre de fenêtre */}
      <div className="flex items-center gap-3 border-b border-contrast/[0.07] bg-ink-850/80 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto hidden items-center gap-1.5 rounded-md border border-contrast/[0.07] bg-ink-950/70 px-3 py-1 text-[10px] text-slate-500 sm:flex">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-success" fill="currentColor">
            <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 1 1 6 0v3H9z" />
          </svg>
          wns.smartmadrassa.be
        </div>
        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <span className="hidden rounded-full border border-contrast/10 px-2 py-0.5 text-[9px] font-semibold text-slate-400 sm:inline">
            FR
          </span>
          <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-brand-700 to-brand-900 text-[8px] font-bold text-white">
            YE
          </span>
        </div>
      </div>

      <div className="flex">
        {/* Navigation latérale */}
        <div
          className={cn(
            'hidden shrink-0 border-r border-contrast/[0.07] bg-ink-950/50 py-3',
            compact ? 'sm:block sm:w-[52px]' : 'sm:block sm:w-[160px]',
          )}
        >
          <div className={cn('mb-3 flex items-center gap-2', compact ? 'justify-center px-2' : 'px-3')}>
            <LogoMark size={20} />
            {!compact && (
              <span className="font-display text-[11px] font-semibold text-contrast">
                Smart<span className="text-accent">Madrassa</span>
              </span>
            )}
          </div>
          <div className="space-y-0.5 px-2">
            {NAV_ITEMS.map(({ id, label, Icon }) => {
              const isActive = id === active;
              return (
                <div
                  key={id}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] transition-colors',
                    compact && 'justify-center px-0',
                    isActive
                      ? 'bg-brand-500/15 font-semibold text-accent ring-1 ring-inset ring-brand-500/25'
                      : 'text-slate-500',
                  )}
                >
                  <Icon className="h-3 w-3 shrink-0" strokeWidth={2} />
                  {!compact && <span className="truncate">{label}</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contenu */}
        <div className="min-w-0 flex-1">
          <div className="flex items-end justify-between gap-3 border-b border-contrast/[0.07] px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-display text-[13px] font-semibold text-contrast">{title}</p>
              {subtitle && <p className="truncate text-[10px] text-slate-500">{subtitle}</p>}
            </div>
            <div className="hidden shrink-0 gap-1.5 sm:flex">
              <span className="rounded-md border border-contrast/[0.08] px-2 py-1 text-[9px] text-slate-400">
                2025-2026
              </span>
              <span className="rounded-md bg-brand-700 px-2 py-1 text-[9px] font-semibold text-white">{t("Enregistrer")}</span>
            </div>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** Coque de téléphone pour les écrans mobiles. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="img"
      aria-label={t('Aperçu de l’application sur téléphone : appel et présences')}
      className={cn(
        'relative w-[218px] shrink-0 rounded-[2rem] border border-contrast/12 bg-ink-900 p-2',
        'shadow-device',
        className,
      )}
    >
      <div className="absolute left-1/2 top-3 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink-950" />
      <div className="relative h-[430px] overflow-hidden rounded-[1.6rem] bg-ink-950">
        <div className="flex items-center justify-between px-4 pb-1 pt-3 text-[9px] font-semibold text-slate-400">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-jade-400" />
            <span className="inline-block h-2 w-3 rounded-[2px] border border-slate-500" />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
