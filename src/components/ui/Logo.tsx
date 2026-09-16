import { cn } from '../../lib/utils';

/**
 * Marque SmartMadrassa : carré arrondi dégradé orange + glyphe « livre ouvert »
 * (même signe que l'écran de démarrage de l'application) et pastille jade.
 */
export function LogoMark({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn('relative inline-grid shrink-0 place-items-center', className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" width={size} height={size} className="absolute inset-0">
        <defs>
          <linearGradient id="sm-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="45%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="40" height="40" rx="12" fill="url(#sm-mark)" />
        <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" fill="none" stroke="rgba(255,255,255,.25)" />
        <g
          transform="translate(8 8) scale(1)"
          fill="none"
          stroke="#fff"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 2h5a3.2 3.2 0 0 1 3.2 3.2V21a2.4 2.4 0 0 0-2.4-2.4H1z" />
          <path d="M23 2h-5a3.2 3.2 0 0 0-3.2 3.2V21a2.4 2.4 0 0 1 2.4-2.4H23z" />
        </g>
      </svg>
      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-jade-500 ring-2 ring-ink-950" />
    </span>
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
