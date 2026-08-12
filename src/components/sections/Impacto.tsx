import { SoftImage } from "@/components/ui/SoftImage";
import { impacto } from "@/lib/content";
import { Reveal, RevealText } from "@/components/ui/Reveal";

function BodyParagraphs({ text }: { text: string }) {
  return (
    <div className="body-prose mt-4 flex-1 space-y-4 text-[0.98rem] text-mute">
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}

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
                  <BodyParagraphs text={project.body} />
                  {"frentes" in project && project.frentes ? (
                    <div className="mt-6">
                      {"frentesTitle" in project && project.frentesTitle ? (
                        <p className="mb-3 text-[0.65rem] tracking-[0.16em] text-gold uppercase">
                          {project.frentesTitle}
                        </p>
                      ) : null}
                      <ul className="flex flex-wrap gap-x-4 gap-y-2">
                        {project.frentes.map((frente) => (
                          <li
                            key={frente}
                            className="text-[0.65rem] tracking-[0.14em] text-mute/80 uppercase"
                          >
                            {frente}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {"invite" in project && project.invite ? (
                    <p className="mt-6 text-sm leading-relaxed text-parchment/80">
                      {project.invite}
                    </p>
                  ) : null}
                  <p className="mt-6 text-xs text-gold/80">{project.address}</p>
                  <p className="mt-2 text-xs text-mute">{project.contact}</p>
                  {"phone" in project && project.phone ? (
                    <a
                      href={project.phoneHref}
                      className="mt-2 block text-xs text-mute transition-colors hover:text-gold"
                    >
                      {project.phone}
                    </a>
                  ) : null}
                  {"email" in project && project.email ? (
                    <a
                      href={project.emailHref}
                      className="mt-1 block text-xs text-mute transition-colors hover:text-gold"
                    >
                      {project.email}
                    </a>
                  ) : null}
                  {"instagram" in project && project.instagram ? (
                    <a
                      href={project.instagramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-xs text-mute transition-colors hover:text-gold"
                    >
                      {project.instagram}
                    </a>
                  ) : null}
                  {"cnpj" in project && project.cnpj ? (
                    <p className="mt-2 text-[0.65rem] text-mute/60">{project.cnpj}</p>
                  ) : null}
                  {"leaderCta" in project && project.leaderCta ? (
                    <a
                      href={project.leaderHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring link-arrow mt-5 inline-flex text-[0.7rem] tracking-[0.14em] text-gold uppercase transition-colors hover:text-gold-soft"
                    >
                      {project.leaderCta}
                      <span className="link-arrow__glyph" aria-hidden>
                        →
                      </span>
                    </a>
                  ) : null}
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

        <Reveal className="mt-20 border-t border-line pt-14">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="surface-editorial">
              <p className="eyebrow mb-4">Doação</p>
              <h3 className="display text-3xl text-parchment">
                {impacto.donation.title}
              </h3>
              <p className="body-prose mt-4 text-mute">{impacto.donation.body}</p>
              <p className="mt-6 text-sm text-parchment">{impacto.donation.org}</p>
              <p className="mt-1 text-xs text-mute">CNPJ {impacto.donation.cnpj}</p>
              <a
                href={impacto.donation.emailHref}
                className="mt-2 block text-sm text-mute transition-colors hover:text-gold"
              >
                {impacto.donation.email}
              </a>
              <a
                href={impacto.donation.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-8 inline-flex rounded-full bg-gold px-6 py-3 text-[0.72rem] tracking-[0.16em] text-ink uppercase transition-colors hover:bg-gold-soft"
              >
                {impacto.donation.cta}
              </a>
            </div>

            <div>
              <p className="eyebrow mb-4">{impacto.howToHelp.title}</p>
              <ul className="space-y-6">
                {impacto.howToHelp.items.map((item) => (
                  <li key={item.title} className="border-l border-gold/40 pl-5">
                    <p className="display text-xl text-parchment">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-mute">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
