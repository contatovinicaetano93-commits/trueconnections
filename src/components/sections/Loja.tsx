import { Package } from "lucide-react";
import { SoftImage } from "@/components/ui/SoftImage";
import { loja, site } from "@/lib/content";

export function Loja() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-parchment">
          {loja.title}
        </h1>
        <p className="text-xs text-mute">{loja.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-mute/70">{loja.body}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {loja.products.map((product) => (
          <article
            key={product.name}
            className="overflow-hidden rounded-2xl border border-line bg-card transition-all duration-500 hover:border-gold/15 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          >
            <div className="relative aspect-square overflow-hidden bg-smoke">
              <SoftImage
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 240px"
              />
            </div>
            <div className="p-3">
              <p className="mb-1 line-clamp-2 text-xs font-medium text-parchment">
                {product.name}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-display)] text-sm text-parchment">
                  {product.price}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-mute">
                  <Package className="h-3 w-3" />
                  {product.stock}
                </span>
              </div>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-[10px] tracking-wide text-gold uppercase"
              >
                Pedir no WhatsApp →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
