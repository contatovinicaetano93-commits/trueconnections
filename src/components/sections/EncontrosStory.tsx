import { encontros } from "@/lib/content";
import { SoftImage } from "@/components/ui/SoftImage";

function PrivateEventsVideo({ src }: { src: string }) {
  if (!src) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-deep/10 text-center">
        <p className="max-w-sm px-6 text-sm text-mute">
          Vídeo em breve — envie o arquivo ou o link para publicarmos aqui.
        </p>
      </div>
    );
  }

  const youtube =
    src.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
    )?.[1] ?? null;
  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1] ?? null;

  if (youtube) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${youtube}`}
        title={encontros.privateEvents.title}
        className="aspect-video w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (vimeo) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vimeo}`}
        title={encontros.privateEvents.title}
        className="aspect-video w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <video
      src={src}
      controls
      playsInline
      className="aspect-video w-full bg-deep/10 object-cover"
    >
      Seu navegador não reproduz este vídeo.
    </video>
  );
}

function BodyParagraphs({ text }: { text: string }) {
  return (
    <div className="body-prose mt-5 flex-1 space-y-4 text-mute/85">
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}

export function EncontrosStory() {
  return (
    <section id="encontros" className="border-t border-line">
      <div className="section-pad mx-auto max-w-6xl py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Comunidade</p>
          <h1 className="display text-[clamp(2.4rem,5vw,4.25rem)] text-parchment">
            {encontros.title}
          </h1>
          <p className="body-prose mt-5 max-w-xl text-mute">{encontros.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-12 border-t border-line pt-12 lg:grid-cols-2 lg:gap-16 lg:pt-16">
          {encontros.items.map((item) => (
            <article key={item.title} className="surface-editorial">
              <p className="eyebrow mb-4">{item.tag}</p>
              <h2 className="display text-3xl text-parchment md:text-[2.65rem]">
                {item.title}
              </h2>
              <BodyParagraphs text={item.body} />
              <p className="surface-editorial__meta">{item.meta}</p>
              {"cta" in item && item.cta && item.ctaHref ? (
                <a
                  href={item.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring link-arrow mt-6 inline-flex text-[0.72rem] tracking-[0.14em] text-gold uppercase transition-colors hover:text-gold-soft"
                >
                  {item.cta}
                  <span className="link-arrow__glyph" aria-hidden>
                    →
                  </span>
                </a>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-12 md:mt-20 md:pt-16">
          <p className="eyebrow mb-8 text-center md:mb-10">
            {encontros.booksHeadline}
          </p>
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-5">
            {encontros.books.map((book) => (
              <article key={book.title} className="text-center">
                <div className="relative mx-auto aspect-[3/4] w-full max-w-[11rem] overflow-hidden rounded-xl bg-card shadow-[0_12px_40px_-18px_rgba(28,24,20,0.35)] sm:max-w-none">
                  <SoftImage
                    src={book.cover}
                    alt={`Capa de ${book.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 44vw, 20vw"
                  />
                </div>
                <h3 className="display mt-4 text-lg leading-snug text-parchment md:text-xl">
                  {book.title}
                </h3>
                <p className="mt-1 text-sm text-mute">{book.author}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-xl border-t border-line pt-10 text-center">
            <p className="eyebrow mb-3 text-gold">{encontros.nextBook.title}</p>
            <p className="text-base leading-relaxed text-mute">
              {encontros.nextBook.body}
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-12 md:mt-20 md:pt-16">
          <article className="surface-editorial max-w-4xl">
            <h2 className="display text-3xl text-parchment md:text-[2.65rem]">
              {encontros.privateEvents.title}
            </h2>
            <p className="body-prose mt-5 text-mute/85">
              {encontros.privateEvents.subtitle}
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-card/40">
              <PrivateEventsVideo src={encontros.privateEvents.videoUrl} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
