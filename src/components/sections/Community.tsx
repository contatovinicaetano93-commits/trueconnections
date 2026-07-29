import { associados, encontros, eventos, site, trueAction } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Encontros() {
  return (
    <section id="encontros" className="section-pad border-t border-line bg-smoke/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-5">Comunidade</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-parchment">
            {encontros.title}
          </h2>
          <p className="mt-4 max-w-2xl text-mute">{encontros.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {encontros.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} y={40}>
              <article className="flex h-full flex-col border border-line bg-ink/50 p-8 md:p-10">
                <p className="eyebrow mb-4">{item.tag}</p>
                <h3 className="display text-3xl text-parchment md:text-4xl">{item.title}</h3>
                <p className="mt-5 flex-1 text-base leading-relaxed text-mute">{item.body}</p>
                {"books" in item && item.books ? (
                  <ul className="mt-6 space-y-2 border-t border-line pt-6">
                    {item.books.map((book) => (
                      <li key={book} className="text-sm text-parchment/75">
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
    <section id="eventos" className="section-pad border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-5">Agenda</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-parchment">
            {eventos.title}
          </h2>
          <p className="mt-4 text-mute">{eventos.subtitle}</p>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {eventos.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="grid gap-4 py-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-[0.65rem] tracking-[0.22em] text-gold uppercase">
                    {item.status}
                  </p>
                  <h3 className="display mt-2 text-3xl text-parchment md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-mute">{item.place}</p>
                </div>
                <span className="text-sm tracking-[0.16em] text-mute uppercase">
                  Em definição
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Associados() {
  return (
    <section id="associados" className="section-pad border-t border-line py-24 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-5">Clube</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-parchment">
            {associados.title}
          </h2>
          <p className="mt-2 text-gold/80">{associados.subtitle}</p>
          <p className="mt-5 text-base leading-relaxed text-mute">{associados.body}</p>
        </Reveal>
        <Reveal>
          <MagneticButton
            href={site.whatsapp}
            external
            className="rounded-full bg-gold px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase text-ink hover:bg-gold-soft"
          >
            {associados.cta}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

export function TrueAction() {
  return (
    <section id="true-action" className="section-pad border-t border-line bg-smoke/30 py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-5">Rede</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-parchment">
            {trueAction.title}
          </h2>
          <p className="mt-2 text-gold/80">{trueAction.subtitle}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute">
            {trueAction.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
