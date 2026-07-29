import { site } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section
      id="contato"
      className="section-pad relative overflow-hidden border-t border-line py-28 md:py-36"
    >
      <div className="liquid-mesh" aria-hidden />
      <div className="glow-line absolute inset-x-[10%] top-0 h-px" aria-hidden />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="eyebrow mb-6">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-gold align-middle" />
            Pertencimento
          </p>
          <h2 className="display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] text-parchment">
            {site.tagline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-mute">
            Abra a porta. Sente à mesa. Encontre o seu lugar nesta rede.
          </p>
          <MagneticButton
            href={site.whatsapp}
            external
            className="mt-10 rounded-full bg-parchment px-8 py-4 text-[0.75rem] font-medium tracking-[0.18em] uppercase text-ink hover:bg-deep"
          >
            Falar com a True
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="section-pad border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-[0.7rem] tracking-[0.2em] text-mute uppercase">
          © {new Date().getFullYear()} True Connection
        </p>
        <p className="text-sm text-mute">{site.tagline}</p>
      </div>
    </footer>
  );
}
