import { loja, site } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
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
          <p className="mt-2 text-sm tracking-wide text-gold/90">{loja.subtitle}</p>
          <p className="body-prose mt-4 max-w-2xl text-mute">{loja.body}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {loja.products.map((product, i) => (
            <Reveal key={product.name} delay={i * 0.07}>
              <article className="group flex h-full flex-col">
                <div className="relative aspect-square overflow-hidden bg-ash">
                  <SoftImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="surface-editorial mt-6 flex flex-1 flex-col">
                  <h3 className="display display--tight text-xl text-parchment">
                    {product.name}
                  </h3>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                    <p className="display text-2xl text-gold">{product.price}</p>
                    <p className="text-xs text-mute/70">{product.stock}</p>
                  </div>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring link-arrow mt-5 inline-flex text-[0.68rem] tracking-[0.16em] text-mute uppercase transition-colors group-hover:text-gold"
                  >
                    Pedir no WhatsApp
                    <span className="link-arrow__glyph" aria-hidden>
                      →
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
