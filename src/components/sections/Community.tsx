import { associados, encontros, eventos, site, trueAction } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Encontros() {
  return (
    <section id="encontros" className="section-pad border-t border-line bg-smoke/50 py-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-5">Comunidade</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-parchment">
            {encontros.title}
          </h2>
          <p className="mt-4 max-w-2xl text-mute/80">{encontros.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {encontros.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} y={40}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-card p-8 md:p-10">
                <p className="eyebrow mb-4">{item.tag}</p>
                <h3 className="display text-3xl text-parchment md:text-4xl">{item.title}</h3>
                <p className="mt-5 flex-1 text-base leading-relaxed text-mute/80">{item.body}</p>
                {"books" in item && item.books ? (
                  <ul className="mt-6 space-y-2 border-t border-line pt-6">
                    {item.books.map((book) => (
                      <li key={book} className="text-sm text-parchment/70">
                        {book}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-6 text-xs tracking-[0.12em] text-gold uppercase">
                  {item.meta}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Eventos() {
  return (
    <section id="eventos" className="section-pad border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-5">Agenda</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-parchment">
            {eventos.title}
          </h2>
          <p className="mt-4 max-w-2xl text-mute">{eventos.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {eventos.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} y={28}>
              <article className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-card p-7 transition-colors hover:border-gold/35 md:p-8">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.65rem] tracking-[0.22em] text-gold uppercase">
                      {item.status}
                    </p>
                    <span className="rounded-full border border-line px-3 py-1 text-[0.6rem] tracking-[0.14em] text-mute uppercase">
                      Data em breve
                    </span>
                  </div>
                  <h3 className="display mt-4 text-2xl text-parchment md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-mute">{item.place}</p>
                </div>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-8 inline-flex text-[0.68rem] tracking-[0.16em] text-mute uppercase transition-colors group-hover:text-gold"
                >
                  Quero ser avisado →
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClubStrip() {
  return (
    <section
      id="associados"
      className="section-pad border-t border-line py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        <Reveal className="bg-card">
          <div className="flex h-full flex-col justify-between p-8 md:p-10">
            <div>
              <p className="eyebrow mb-4">Clube</p>
              <h2 className="display text-3xl text-parchment md:text-4xl">
                {associados.title}
              </h2>
              <p className="mt-2 text-gold/80">{associados.subtitle}</p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-mute">
                {associados.body}
              </p>
            </div>
            <MagneticButton
              href={site.whatsapp}
              external
              className="mt-8 w-fit rounded-full bg-gold px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase text-ink hover:bg-gold-soft"
            >
              {associados.cta}
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="bg-smoke/60" y={24}>
          <div id="true-action" className="flex h-full flex-col justify-between p-8 md:p-10">
            <div>
              <p className="eyebrow mb-4">Rede</p>
              <h2 className="display text-3xl text-parchment md:text-4xl">
                {trueAction.title}
              </h2>
              <p className="mt-2 text-gold/80">{trueAction.subtitle}</p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-mute">
                {trueAction.body}
              </p>
            </div>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-8 inline-flex text-[0.72rem] tracking-[0.16em] text-mute uppercase transition-colors hover:text-gold"
            >
              Indicar um profissional →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
