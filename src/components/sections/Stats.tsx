import { STATS } from '../../content/site';
import { AnimatedNumber, RevealGroup, RevealItem } from '../ui/primitives';

export function Stats() {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.012]">
      <div className="container-x py-14 sm:py-16">
        <RevealGroup className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
          {STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="relative">
                <div className="font-display text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-[2.75rem]">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm leading-snug text-slate-300">{stat.label}</p>
                <p className="mt-1 text-xs text-slate-600">{stat.sub}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
