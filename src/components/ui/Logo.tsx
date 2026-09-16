import { t } from '../../lib/i18n';
import { cn } from '../../lib/utils';

/**
 * Logo officiel de SmartMadrassa : calligraphie arabe « مدرسة »
 * identique à celle de l'application.
 *
 * L'original 352×245 pesait 76 ko pour un logo affiché entre 29 et 55 pixels
 * de large. Il est servi en WebP redimensionné (21 ko), avec un PNG de repli
 * (13 ko) que seuls d'anciens navigateurs iront chercher. La source pleine
 * résolution reste dans assets-source/, hors de ce qui est publié.
 *
 * `priority` marque l'exemplaire de l'en-tête : il est dans le premier écran,
 * il ne doit ni être différé ni attendre son tour.
 */
export function LogoMark({
  className,
  size = 36,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  const width = Math.round(size * (352 / 245));
  return (
    <picture>
      <source srcSet="/logo.webp" type="image/webp" />
      <img
        src="/logo.png"
        alt={t('Logo SmartMadrassa')}
        width={width}
        height={size}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={cn('shrink-0 object-contain select-none', className)}
        style={{ height: `${size}px`, width: 'auto' }}
      />
    </picture>
  );
}

export function Logo({
  className,
  size = 34,
  showWordmark = true,
  priority = false,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  priority?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={size} priority={priority} />
      {showWordmark && (
        <span className="logo-wordmark font-display text-[17px] font-semibold tracking-[-0.02em] text-contrast" dir="ltr">
          Smart<span className="text-accent">Madrassa</span>
        </span>
      )}
    </span>
  );
}
