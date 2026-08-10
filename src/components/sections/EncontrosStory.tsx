"use client";

import type { CSSProperties } from "react";
import { encontros } from "@/lib/content";
import { useStickyStep } from "@/hooks/useStickyStep";

const STEP_COUNT = 3;

export function EncontrosStory() {
  const { trackRef, step, on } = useStickyStep(STEP_COUNT);

  return (
    <section id="encontros" className="border-t border-line">
      <div ref={trackRef} className="text-story">
        <div className="text-story__sticky">
          <div className="mx-auto flex h-full max-w-6xl items-center px-5 py-20 md:px-8 md:py-28">
            <div className="max-w-2xl">
              <p className={`scroll-story-step eyebrow mb-4 ${on(0) ? "is-on" : ""}`}>
                Comunidade
              </p>
              <h2
                className={`scroll-story-step display text-[clamp(2.4rem,5vw,4.25rem)] text-parchment ${
                  on(1) ? "is-on" : ""
                }`}
              >
                {encontros.title}
              </h2>
              <p
                className={`scroll-story-step body-prose mt-5 max-w-xl text-mute ${
                  on(2) ? "is-on" : ""
                }`}
              >
                {encontros.subtitle}
              </p>
            </div>
          </div>

          <div className="text-story__progress" aria-hidden>
            <div
              className="text-story__progress-bar"
              style={{ width: `${((step + 1) / STEP_COUNT) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="section-pad mx-auto max-w-6xl pb-20 md:pb-28">
        <div className="grid gap-12 border-t border-line pt-14 lg:grid-cols-2 lg:gap-16 lg:pt-16">
          {encontros.items.map((item, i) => (
            <article
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": i * 80 } as CSSProperties}
              className="surface-editorial"
            >
              <p className="eyebrow mb-4">{item.tag}</p>
              <h3 className="display text-3xl text-parchment md:text-[2.65rem]">
                {item.title}
              </h3>
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
