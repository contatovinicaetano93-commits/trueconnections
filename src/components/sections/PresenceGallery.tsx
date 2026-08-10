"use client";

import { presence } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SoftImage } from "@/components/ui/SoftImage";

export function PresenceGallery() {
  return (
    <section className="border-t border-line py-16 md:py-24">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow mb-4">{presence.title}</p>
          <h2 className="display max-w-2xl text-[clamp(2.2rem,4.5vw,3.6rem)] text-parchment">
            {presence.subtitle}
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-px bg-line md:grid-cols-6">
        {presence.items.map((item, i) => {
          const wide = i % 5 === 0 || i % 5 === 3;
          return (
            <Reveal
              key={item.label}
              delay={Math.min(i * 0.04, 0.28)}
              y={20}
              className={wide ? "col-span-2 md:col-span-3" : "md:col-span-2"}
            >
              <figure className="group relative aspect-[4/5] overflow-hidden bg-ash md:aspect-[5/4]">
                <SoftImage
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/70 to-transparent p-4 text-[0.65rem] tracking-[0.18em] text-ink uppercase">
                  {item.label}
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
