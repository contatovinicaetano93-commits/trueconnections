import { SoftImage } from "@/components/ui/SoftImage";
import { impacto } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

export function Impacto() {
  return (
    <section id="impacto" className="section-pad border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-5">Missão</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-parchment">
            {impacto.title}
          </h2>
          <p className="mt-4 max-w-2xl text-mute">{impacto.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 border-y border-line py-10 sm:grid-cols-3">
          {impacto.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <p className="display text-5xl text-gold md:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm tracking-[0.12em] text-mute uppercase">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {impacto.projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08} y={40}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card">
                {"image" in project && project.image ? (
                  <div className="relative aspect-[16/10]">
                    <SoftImage
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-end bg-gradient-to-br from-smoke to-ash p-8">
                    <span className="display text-4xl text-gold/50">02</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-8">
                  <p className="eyebrow mb-3">{project.tag}</p>
                  <h3 className="display text-3xl text-parchment">{project.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-mute">
                    {project.body}
                  </p>
                  {"frentes" in project && project.frentes ? (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.frentes.map((frente) => (
                        <li
                          key={frente}
                          className="border border-line px-3 py-1 text-[0.65rem] tracking-[0.14em] text-mute uppercase"
                        >
                          {frente}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="mt-6 text-xs text-gold/80">{project.address}</p>
                  <p className="mt-2 text-xs text-mute">{project.contact}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
