import { cn } from '../../lib/utils';

/**
 * Logo officiel de SmartMadrassa : calligraphie arabe « مدرسة »
 * identique à celle de l'application (public/logo.png).
 */
export function LogoMark({ className, size = 36 }: { className?: string; size?: number }) {
  const width = Math.round(size * (352 / 245));
  return (
    <img
      src="/logo.png"
      alt="Logo SmartMadrassa"
      width={width}
      height={size}
      className={cn('shrink-0 object-contain select-none', className)}
      style={{ height: `${size}px`, width: 'auto' }}
    />
  );
}

export function Logo({
  className,
  size = 34,
  showWordmark = true,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className="font-display text-[17px] font-semibold tracking-[-0.02em] text-contrast">
          Smart<span className="text-accent">Madrassa</span>
        </span>
      )}
    </span>
  );
}
