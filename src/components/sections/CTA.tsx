import { nav, qgs, site } from "@/lib/content";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealText } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section
      id="contato"
      className="section-pad relative overflow-hidden border-t border-line py-20 md:py-32"
    >
      <div className="liquid-mesh" aria-hidden />
      <div className="glow-line absolute inset-x-[10%] top-0 h-px" aria-hidden />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="eyebrow mb-6">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-gold align-middle" />
            Pertencimento
          </p>
        </Reveal>
        <RevealText
          as="h2"
          className="display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] text-parchment"
          delay={0.05}
        >
          {site.tagline}
        </RevealText>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-mute">
            Abra a porta. Sente à mesa. Encontre o seu lugar nesta rede.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={site.whatsapp}
              external
              className="rounded-full bg-gold px-8 py-4 text-[0.75rem] font-medium tracking-[0.18em] uppercase text-deep hover:bg-gold-soft"
            >
              Falar com a True
            </MagneticButton>
            <a
              href="/seja-associado"
              className="focus-ring link-arrow text-[0.72rem] tracking-[0.16em] text-mute uppercase transition-colors hover:text-gold"
            >
              Conhecer associados
              <span className="link-arrow__glyph" aria-hidden>
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="section-pad border-t border-line bg-smoke/25 py-14 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex flex-col items-start gap-0 leading-none">
            <BrandLogo variant="mark" size="xl" className="-mb-1" />
            <p className="relative z-[1] text-[0.7rem] tracking-[0.22em] text-gold uppercase">
              {site.name}
            </p>
          </div>
          <p className="display mt-4 max-w-sm text-2xl text-parchment md:text-3xl">
            {site.tagline}
          </p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring link-arrow mt-6 inline-flex text-sm text-mute transition-colors hover:text-gold"
          >
            WhatsApp
            <span className="link-arrow__glyph" aria-hidden>
              →
            </span>
          </a>
        </div>

        <div>
          <p className="eyebrow mb-4">Navegar</p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                {"external" in item && item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm text-mute transition-colors hover:text-parchment"
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    href={item.href}
                    className="focus-ring text-sm text-mute transition-colors hover:text-parchment"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Nossos QGs</p>
          <ul className="space-y-4">
            {qgs.items.map((item) => (
              <li key={item.name}>
                <p className="text-sm text-parchment">{item.name}</p>
                <p className="text-sm text-mute/75">{item.address}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-mute/60">
            Comunidade cristã editorial · São Paulo
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-[0.65rem] tracking-[0.18em] text-mute/70 uppercase">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="text-xs text-mute/60">Feito com presença e propósito.</p>
      </div>
    </footer>
  );
}
