import { qgs } from "@/lib/content";
import { SoftImage } from "@/components/ui/SoftImage";

export function QgsStory() {
  return (
    <section id="qgs" className="border-t border-line bg-smoke/40">
      <div className="section-pad mx-auto max-w-6xl py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Mapa</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4.25rem)] text-parchment">
            {qgs.title}
          </h2>
          <p className="body-prose mt-5 max-w-xl text-mute">
            Lugares onde a comunidade se encontra — café, conversa e presença de
            verdade.
          </p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-2 md:gap-4">
          {qgs.items.map((item) => (
            <article key={item.name} className="surface-media">
              <div className="surface-media__img">
                <SoftImage
                  src={item.image}
                  alt={item.name}
                  fill
                  className="surface-media__photo object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="surface-media__veil" aria-hidden />
              <div className="surface-media__body">
                <h3 className="display display--tight text-2xl text-ink md:text-3xl">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-ink/70">{item.address}</p>
                <p className="mt-4 text-sm tracking-wide text-gold-soft">
                  {item.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
