import { associados, site, trueAction } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function AssociadosSection() {
  return (
    <section
      id="associados"
      className="section-pad scroll-mt-28 border-t border-line py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow mb-4">Clube</p>
          <h1 className="display text-[clamp(2.2rem,4.5vw,3.6rem)] text-parchment">
            {associados.title}
          </h1>
          <p className="mt-2 text-sm tracking-wide text-gold/90">
            {associados.subtitle}
          </p>
          <p className="body-prose mt-5 text-mute">{associados.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              href={associados.membersHref}
              className="w-fit rounded-full bg-gold px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase text-ink hover:bg-gold-soft"
            >
              Entrar
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
      </div>
    </section>
  );
}

export function TrueActionSection() {
  return (
    <section
      id="true-action"
      className="section-pad scroll-mt-28 border-t border-line py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow mb-4">Rede</p>
          <h1 className="display text-[clamp(2.2rem,4.5vw,3.6rem)] text-parchment">
            {trueAction.title}
          </h1>
          <p className="mt-2 text-sm tracking-wide text-gold/90">
            {trueAction.subtitle}
          </p>
          <p className="body-prose mt-5 text-mute">{trueAction.body}</p>
          <div className="mt-8">
            <MagneticButton
              href={trueAction.whatsapp}
              external
              className="w-fit rounded-full bg-gold px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase text-ink hover:bg-gold-soft"
            >
              {trueAction.cta}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
