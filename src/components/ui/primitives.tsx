import { type ReactNode, type ElementType, useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';
import { EASE, riseIn, stagger, viewportOnce } from '../../lib/motion';
import { useMagnetic, useSpotlight } from '../../lib/hooks';

/* ------------------------------------------------------------------ */
/* Révélations au scroll                                               */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const Comp = motion[as as 'div'] ?? motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.85, ease: EASE, delay },
        },
      }}
    >
      {children}
    </Comp>
  );
}

export function RevealGroup({
  children,
  className,
  gap = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(gap, delay)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={riseIn}>
      {children}
    </motion.div>
  );
}

/** Titre révélé ligne par ligne derrière un masque. */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  return (
    <span className={cn('block', className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={cn('block', lineClassName)}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.11 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Boutons                                                             */
/* ------------------------------------------------------------------ */

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'md' | 'lg';
  className?: string;
  magnetic?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  external?: boolean;
};

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  magnetic = false,
  type = 'button',
  disabled,
  external,
}: ButtonProps) {
  const magRef = useMagnetic<HTMLSpanElement>(0.22);

  const base = cn(
    'group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium',
    'transition-[transform,box-shadow,background-color,border-color] duration-300 will-change-transform',
    'disabled:pointer-events-none disabled:opacity-50',
    size === 'lg' ? 'px-7 py-3.5 text-[15px]' : 'px-5 py-2.5 text-sm',
    variant === 'primary' &&
      'bg-gradient-to-b from-brand-400 to-brand-600 text-white shadow-[0_10px_40px_-12px_rgba(249,115,22,.85)] hover:shadow-[0_16px_50px_-10px_rgba(249,115,22,.95)] hover:brightness-[1.06] active:scale-[.98]',
    variant === 'outline' &&
      'border border-white/15 bg-white/[0.03] text-white backdrop-blur hover:border-white/30 hover:bg-white/[0.07] active:scale-[.98]',
    variant === 'ghost' && 'text-slate-300 hover:text-white',
    className,
  );

  const inner = (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/25 blur-md transition-all duration-700 group-hover:left-[140%]" />
        </span>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const content = magnetic ? (
    <span ref={magRef} className="inline-flex items-center gap-2">
      {inner}
    </span>
  ) : (
    inner
  );

  if (href) {
    return (
      <a
        href={href}
        className={base}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {content}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Décor                                                               */
/* ------------------------------------------------------------------ */

/** Nappes de couleur floutées qui dérivent lentement en arrière-plan. */
export function Aurora({ className, variant = 'hero' }: { className?: string; variant?: 'hero' | 'soft' }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className={cn(
          'absolute left-[8%] top-[-18%] h-[36rem] w-[36rem] rounded-full blur-[120px] animate-drift',
          variant === 'hero' ? 'bg-brand-500/25' : 'bg-brand-500/12',
        )}
      />
      <div
        className={cn(
          'absolute right-[4%] top-[6%] h-[30rem] w-[30rem] rounded-full blur-[130px] animate-drift-slow',
          variant === 'hero' ? 'bg-jade-500/20' : 'bg-jade-500/10',
        )}
      />
      <div className="absolute bottom-[-20%] left-[35%] h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-[140px] animate-drift" />
    </div>
  );
}

/** Grille fine qui s'estompe vers le bas. */
export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000_20%,transparent_100%)]',
        className,
      )}
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(148,163,184,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.06) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    />
  );
}

/** Grain fin, pour casser les dégradés trop lisses. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Cartes                                                              */
/* ------------------------------------------------------------------ */

/** Carte avec halo radial suivant le curseur. */
export function SpotlightCard({
  children,
  className,
  glow = 'rgba(249,115,22,.16)',
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  const ref = useSpotlight<HTMLDivElement>();
  return (
    <div ref={ref} className={cn('card group p-6', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(360px circle at var(--mx,50%) var(--my,50%), ${glow}, transparent 68%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/** Inclinaison 3D légère au survol. */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 140, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className={cn('preserve-3d', className)}
      style={{ rotateX: rx, rotateY: ry }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Divers                                                              */
/* ------------------------------------------------------------------ */

/** Compteur qui s'anime une fois visible. */
export function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 1600,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Bandeau défilant en boucle, dupliqué pour une boucle sans couture. */
export function Marquee({
  items,
  duration = 46,
  reverse = false,
  className,
}: {
  items: readonly string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mask-fade-x relative flex overflow-hidden', className)}>
      <div
        className="flex min-w-full shrink-0 items-center gap-10 pr-10 animate-marquee"
        style={
          {
            '--marquee-duration': `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span className="whitespace-nowrap text-sm font-medium text-slate-400">{item}</span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-brand-500/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('eyebrow', className)}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 animate-pulse-ring" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <RevealGroup
      className={cn(
        'flex flex-col gap-5',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <RevealItem>
          <Eyebrow>{eyebrow}</Eyebrow>
        </RevealItem>
      )}
      <RevealItem>
        <h2
          className={cn(
            'text-balance text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-[2.9rem]',
            align === 'center' ? 'max-w-3xl' : 'max-w-2xl',
          )}
        >
          {title}
        </h2>
      </RevealItem>
      {lead && (
        <RevealItem>
          <p
            className={cn(
              'text-pretty text-base leading-relaxed text-slate-400 sm:text-[17px]',
              align === 'center' ? 'max-w-2xl' : 'max-w-xl',
            )}
          >
            {lead}
          </p>
        </RevealItem>
      )}
    </RevealGroup>
  );
}

/** Filet lumineux horizontal, séparateur de sections. */
export function Hairline({ className }: { className?: string }) {
  return <div aria-hidden className={cn('hairline', className)} />;
}
