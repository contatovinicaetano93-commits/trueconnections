import { associados, eventos, site, trueAction } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

/** Clube (Associados) + rede (True Action) — um capítulo, duas colunas. */
export function ClubeERede() {
  return (
    <section className="section-pad border-t border-line py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow mb-4">Pertencer</p>
          <h2 className="display text-[clamp(2.2rem,4.5vw,3.6rem)] text-parchment">
            Clube e rede
          </h2>
          <p className="body-prose mt-4 max-w-xl text-mute">
            Dois jeitos de viver a True de perto — como associado e na rede de
            profissionais.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 border-t border-line pt-12 lg:grid-cols-2 lg:gap-0">
          <article
            id="associados"
            className="scroll-mt-28 lg:border-r lg:border-line lg:pr-12"
          >
            <Reveal>
              <p className="eyebrow mb-4">Clube</p>
              <h3 className="display text-[clamp(1.85rem,3vw,2.75rem)] text-parchment">
                {associados.title}
              </h3>
              <p className="mt-2 text-sm tracking-wide text-gold/90">
                {associados.subtitle}
              </p>
              <p className="body-prose mt-5 text-mute">{associados.body}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticButton
                  href={associados.membersHref}
                  className="w-fit rounded-full bg-gold px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase text-deep hover:bg-gold-soft"
                >
                  {associados.membersCta}
                </MagneticButton>
                <MagneticButton
                  href={site.whatsapp}
                  external
                  className="w-fit rounded-full border border-line px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase text-parchment/80 hover:border-gold/50 hover:text-gold"
                >
                  {associados.cta}
                </MagneticButton>
              </div>
            </Reveal>
          </article>

          <article
            id="true-action"
            className="scroll-mt-28 lg:pl-12"
          >
            <Reveal delay={0.06}>
              <p className="eyebrow mb-4">Rede</p>
              <h3 className="display text-[clamp(1.85rem,3vw,2.75rem)] text-parchment">
                {trueAction.title}
              </h3>
              <p className="mt-2 text-sm tracking-wide text-gold/90">
                {trueAction.subtitle}
              </p>
              <p className="body-prose mt-5 text-mute">{trueAction.body}</p>
              <div className="mt-8">
                <MagneticButton
                  href={trueAction.whatsapp}
                  external
                  className="w-fit rounded-full bg-gold px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase text-deep hover:bg-gold-soft"
                >
                  {trueAction.cta}
                </MagneticButton>
              </div>
            </Reveal>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Eventos() {
  return (
    <section id="eventos" className="section-pad border-t border-line py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">Agenda</p>
            <h2 className="display text-[clamp(2.2rem,4vw,3.4rem)] text-parchment">
              {eventos.title}
            </h2>
            <p className="body-prose mt-4 text-mute">{eventos.subtitle}</p>
          </Reveal>

          <div className="divide-y divide-line border-y border-line">
            {eventos.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="group flex flex-col gap-3 py-7 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <p className="text-[0.65rem] tracking-[0.22em] text-gold uppercase">
                        {item.status}
                      </p>
                      <span className="text-[0.65rem] tracking-[0.14em] text-mute/70 uppercase">
                        Data em breve
                      </span>
                    </div>
                    <h3 className="display text-xl text-parchment md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-mute">{item.place}</p>
                  </div>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring link-arrow shrink-0 text-[0.68rem] tracking-[0.16em] text-mute uppercase transition-colors group-hover:text-gold sm:pt-1"
                  >
                    Quero ser avisado
                    <span className="link-arrow__glyph" aria-hidden>
                      →
                    </span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
