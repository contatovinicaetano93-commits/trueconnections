import { encontros } from "@/lib/content";

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
              <p className="body-prose mt-5 flex-1 text-mute/85">{item.body}</p>
              {"books" in item && item.books ? (
                <ul className="mt-8 space-y-2.5">
                  {item.books.map((book) => (
                    <li
                      key={book}
                      className="display--tight font-display text-[0.95rem] leading-snug text-parchment/75"
                    >
                      {book}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="surface-editorial__meta">{item.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
