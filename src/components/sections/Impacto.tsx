import { SoftImage } from "@/components/ui/SoftImage";
import { impacto } from "@/lib/content";
import { Reveal, RevealText } from "@/components/ui/Reveal";

export function Impacto() {
  return (
    <section id="impacto" className="section-pad border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-5">Missão</p>
        </Reveal>
        <RevealText
          as="h2"
          className="display text-[clamp(2.4rem,5vw,4rem)] text-parchment"
          delay={0.04}
        >
          {impacto.title}
        </RevealText>
        <Reveal delay={0.1}>
          <p className="body-prose mt-4 max-w-2xl text-mute">{impacto.subtitle}</p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-10">
          {impacto.projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <article className="group flex h-full flex-col">
                {"image" in project && project.image ? (
                  <div className="relative mb-7 aspect-[16/10] overflow-hidden">
                    <SoftImage
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="mb-7 flex aspect-[16/10] items-end bg-gradient-to-br from-smoke to-ash p-8">
                    <span className="display text-4xl text-gold/50">02</span>
                  </div>
                )}
                <div className="surface-editorial flex flex-1 flex-col">
                  <p className="eyebrow mb-3">{project.tag}</p>
                  <h3 className="display text-3xl text-parchment">{project.title}</h3>
                  <p className="body-prose mt-4 flex-1 text-[0.98rem] text-mute">
                    {project.body}
                  </p>
                  {"frentes" in project && project.frentes ? (
                    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                      {project.frentes.map((frente) => (
                        <li
                          key={frente}
                          className="text-[0.65rem] tracking-[0.14em] text-mute/80 uppercase"
                        >
                          {frente}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="mt-6 text-xs text-gold/80">{project.address}</p>
                  <p className="mt-2 text-xs text-mute">{project.contact}</p>
                  {"reportUrl" in project && project.reportUrl ? (
                    <a
                      href={project.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring link-arrow mt-5 inline-flex text-[0.7rem] tracking-[0.14em] text-gold uppercase transition-colors hover:text-gold-soft"
                    >
                      {project.reportLabel ?? "Ver relatório"}
                      <span className="link-arrow__glyph" aria-hidden>
                        →
                      </span>
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
