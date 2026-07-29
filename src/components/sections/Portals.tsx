import { portals } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";

export function Portals() {
  return (
    <section
      id="portais"
      className="section-pad relative z-10 mx-auto max-w-7xl pb-24 pt-2 md:pb-32"
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <Marquee />

        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {portals.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04} y={16} className="h-full bg-card">
              <a
                href={item.href}
                className="focus-ring group flex h-full min-h-[12rem] flex-col justify-between bg-card p-6 transition-colors duration-300 hover:bg-white/70 md:min-h-[13rem] md:p-7"
                {...("external" in item && item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="text-[0.65rem] tracking-[0.24em] text-gold/80 uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="display text-[1.35rem] leading-tight text-parchment transition-colors group-hover:text-gold md:text-[1.45rem]">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-snug text-mute/75">
                    {item.subtitle}
                  </p>
                  <span className="mt-4 inline-block text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
