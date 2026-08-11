import { impacto } from "@/lib/content";
import { Counter } from "@/components/ui/Counter";

export function StatsStrip() {
  return (
    <section
      className="border-y border-line bg-smoke/40 py-12 md:py-16"
      aria-label="Números True Connections"
    >
      <div className="section-pad mx-auto grid max-w-6xl gap-10 sm:grid-cols-3 sm:gap-8">
        {impacto.stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="display display--tight text-[clamp(3rem,8vw,4.75rem)] leading-none text-gold">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-[0.7rem] tracking-[0.2em] text-mute uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
