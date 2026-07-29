import { portals } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Portals() {
  return (
    <section className="section-pad relative z-10 mx-auto -mt-4 max-w-7xl pb-24 md:pb-32">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {portals.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.04} y={24}>
            <a
              href={item.href}
              className="focus-ring group flex h-full min-h-[9.5rem] flex-col justify-between rounded-2xl bg-card p-6 transition-colors duration-300 hover:bg-white/55 md:p-7"
              {...("external" in item && item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="text-[0.65rem] tracking-[0.24em] text-gold/80 uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="display text-2xl text-parchment transition-colors group-hover:text-gold">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-mute/75">{item.subtitle}</p>
                <span className="mt-4 inline-block text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
