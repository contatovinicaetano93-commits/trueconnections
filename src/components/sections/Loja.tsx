import Image from "next/image";
import { loja, qgs, site } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Loja() {
  return (
    <section id="loja" className="section-pad border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-5">Identidade</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-parchment">
            {loja.title}
          </h2>
          <p className="mt-2 text-gold/80">{loja.subtitle}</p>
          <p className="mt-4 max-w-2xl text-mute">{loja.body}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {loja.products.map((product, i) => (
            <Reveal key={product.name} delay={i * 0.07} y={32}>
              <TiltCard className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card">
                  <div className="relative aspect-square overflow-hidden bg-ash">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="display text-xl text-parchment">{product.name}</h3>
                    <div className="mt-auto flex items-end justify-between pt-6">
                      <p className="display text-2xl text-gold">{product.price}</p>
                      <p className="text-xs text-mute/70">{product.stock}</p>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <MagneticButton
            href={site.whatsapp}
            external
            className="group text-sm tracking-[0.14em] text-mute uppercase transition-colors hover:text-gold"
          >
            Pedir pelo WhatsApp
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

export function QGs() {
  return (
    <section className="section-pad border-t border-line bg-smoke/40 py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-5">Presença</p>
          <h2 className="display text-[clamp(2.2rem,4vw,3.5rem)] text-parchment">
            {qgs.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {qgs.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <article className="overflow-hidden rounded-2xl border border-line bg-card">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="bg-ink/90 p-7">
                  <h3 className="display text-2xl text-parchment">{item.name}</h3>
                  <p className="mt-2 text-sm text-mute/75">{item.address}</p>
                  <p className="mt-4 text-sm text-gold">{item.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
