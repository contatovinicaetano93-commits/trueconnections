import { encontros } from "@/lib/content";
import { SoftImage } from "@/components/ui/SoftImage";

function PrivateEventsVideo({ src }: { src: string }) {
  if (!src) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-black/[0.03] text-center">
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
      className="aspect-video w-full bg-black/[0.03] object-cover"
    >
      Seu navegador não reproduz este vídeo.
    </video>
  );
}

function BodyParagraphs({ text }: { text: string }) {
  return (
    <div className="mt-4 space-y-3 text-sm leading-relaxed text-mute">
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}

export function EncontrosStory() {
  const [naMesa, clube] = encontros.items;

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 font-[family-name:var(--font-display)] text-2xl text-parchment md:text-3xl">
          Eventos Gratuitos
        </h1>
        <p className="text-sm text-mute">{encontros.subtitle}</p>
      </div>

      <div className="space-y-8">
        <article className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
          <div className="p-6 md:p-8">
            <p className="mb-3 text-[0.65rem] tracking-[0.18em] text-gold uppercase">
              {naMesa.tag}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-parchment md:text-3xl">
              {naMesa.title}
            </h2>
            <BodyParagraphs text={naMesa.body} />
            <p className="mt-6 text-[0.7rem] tracking-[0.12em] text-gold uppercase">
              {naMesa.meta}
            </p>
            {"cta" in naMesa && naMesa.cta && naMesa.ctaHref ? (
              <a
                href={naMesa.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-[0.7rem] tracking-[0.14em] text-ink uppercase transition-colors hover:bg-gold-soft"
              >
                {naMesa.cta}
              </a>
            ) : null}
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
          <div className="p-6 md:p-8">
            <p className="mb-3 text-[0.65rem] tracking-[0.18em] text-gold uppercase">
              {clube.tag}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-parchment md:text-3xl">
              {clube.title}
            </h2>
            <BodyParagraphs text={clube.body} />

            <p className="mb-4 mt-8 text-[0.65rem] tracking-[0.18em] text-mute uppercase">
              {encontros.booksHeadline}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {encontros.books.map((book) => (
                <div key={book.title} className="text-center">
                  <div className="relative mx-auto aspect-[2/3] overflow-hidden rounded-lg bg-smoke shadow-sm">
                    <SoftImage
                      src={book.cover}
                      alt={`Capa de ${book.title}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-xs leading-snug text-parchment">
                    {book.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-mute">{book.author}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-line bg-ink/40 p-5">
              <p className="text-[0.65rem] tracking-[0.16em] text-gold uppercase">
                {encontros.nextBook.title}
              </p>
              <p className="mt-2 text-sm text-mute">{encontros.nextBook.body}</p>
              <p className="mt-4 text-[0.7rem] tracking-[0.12em] text-gold uppercase">
                {clube.meta}
              </p>
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
          <div className="p-6 md:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-parchment">
              {encontros.privateEvents.title}
            </h2>
            <p className="mt-3 text-sm text-mute">
              {encontros.privateEvents.subtitle}
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-line">
              <PrivateEventsVideo src={encontros.privateEvents.videoUrl} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
