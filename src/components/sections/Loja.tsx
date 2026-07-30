import { loja, qgs, site } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { SoftImage } from "@/components/ui/SoftImage";

export function Loja() {
  return (
    <section id="loja" className="section-pad border-t border-line py-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-5">Identidade</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-parchment">
            {loja.title}
          </h2>
          <p className="mt-2 text-gold/80">{loja.subtitle}</p>
          <p className="mt-4 max-w-2xl text-mute">{loja.body}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {loja.products.map((product, i) => (
            <Reveal key={product.name} delay={i * 0.07} y={32}>
              <TiltCard className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card">
                  <div className="relative aspect-square overflow-hidden bg-ash">
                    <SoftImage
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-deep/80 p-4 transition-transform duration-300 group-hover:translate-y-0">
                      <a
                        href={site.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring block text-center text-[0.68rem] tracking-[0.16em] text-ink uppercase"
                      >
                        Pedir no WhatsApp →
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="display text-xl text-parchment">{product.name}</h3>
                    <div className="mt-auto flex items-end justify-between pt-6">
                      <p className="display text-2xl text-gold">{product.price}</p>
                      <p className="text-xs text-mute/70">{product.stock} disponíveis</p>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QGs() {
  return (
    <section className="section-pad border-t border-line bg-smoke/40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-5">Presença</p>
          <h2 className="display text-[clamp(2.2rem,4vw,3.5rem)] text-parchment">
            {qgs.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {qgs.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <article className="overflow-hidden rounded-2xl border border-line bg-card">
                <div className="relative aspect-[16/10]">
                  <SoftImage
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
