import { manifesto, site } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SoftImage } from "@/components/ui/SoftImage";

export function Manifesto() {
  return (
    <section id="manifesto" className="section-pad border-t border-line py-20 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Manifesto</p>
            <h2 className="display text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.05] text-parchment">
              {manifesto.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-parchment/85">
              {manifesto.lead}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-mute">
              {manifesto.body}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-12 border-l border-gold/40 pl-6">
              <p className="eyebrow mb-3">{manifesto.missionTitle}</p>
              <p className="max-w-lg text-base leading-relaxed text-parchment/80">
                {manifesto.mission}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal y={48} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ash">
            <SoftImage
              src={site.foundersImage}
              alt="Gabriella, Beta e Aline — fundadoras da True Connection"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/75 via-transparent to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-6 text-sm leading-relaxed text-ink">
              {manifesto.foundersLabel}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-8 border-t border-line pt-12 md:grid-cols-3 md:pt-14">
        {manifesto.founders.map((founder, i) => (
          <Reveal key={founder.name} delay={i * 0.06}>
            <article>
              <h3 className="display text-2xl text-gold">{founder.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{founder.bio}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-14 max-w-7xl">
        <p className="display max-w-3xl text-3xl leading-snug text-parchment md:text-4xl">
          {manifesto.closing}
        </p>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring mt-8 inline-flex text-[0.72rem] tracking-[0.16em] text-mute uppercase transition-colors hover:text-gold"
        >
          Quero fazer parte →
        </a>
      </Reveal>
    </section>
  );
}
