"use client";

import { manifesto, site } from "@/lib/content";
import { SoftImage } from "@/components/ui/SoftImage";
import { useStickyStep } from "@/hooks/useStickyStep";

const INTRO_STEPS = 4;
const CARD_STEPS = 3;
const FOUNDERS_STEPS = 4;

const cards = [
  { label: "Missão", value: manifesto.mission },
  {
    label: "Fundadoras",
    value: manifesto.founders.map((f) => f.name).join(" · "),
  },
  { label: "Essência", value: manifesto.closing },
] as const;

export function ManifestoStory() {
  const intro = useStickyStep(INTRO_STEPS);
  const cardsStory = useStickyStep(CARD_STEPS);
  const founders = useStickyStep(FOUNDERS_STEPS);

  return (
    <section id="manifesto" className="border-t border-line bg-smoke/30">
      <div ref={intro.trackRef} className="conceito-intro">
        <div className="conceito-intro__sticky">
          <div className="mx-auto flex h-full max-w-6xl items-center px-5 py-20 md:px-8 md:py-28">
            <div className="max-w-3xl">
              <p
                className={`scroll-story-step eyebrow mb-4 ${intro.on(0) ? "is-on" : ""}`}
              >
                Manifesto
              </p>
              <h2
                className={`scroll-story-step display text-[clamp(2.4rem,5vw,4.2rem)] text-parchment ${
                  intro.on(1) ? "is-on" : ""
                }`}
              >
                {manifesto.title}
              </h2>
              <h3
                className={`scroll-story-step mt-6 display text-[clamp(1.4rem,3vw,2.2rem)] leading-snug text-parchment/90 ${
                  intro.on(2) ? "is-on" : ""
                }`}
              >
                {manifesto.lead}
              </h3>
              <p
                className={`scroll-story-step mt-5 max-w-3xl text-base leading-relaxed text-mute ${
                  intro.on(3) ? "is-on" : ""
                }`}
              >
                {manifesto.body}
              </p>
            </div>
          </div>

          <div className="text-story__progress" aria-hidden>
            <div
              className="text-story__progress-bar"
              style={{
                width: `${((intro.step + 1) / INTRO_STEPS) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div ref={cardsStory.trackRef} className="conceito-story">
        <div className="conceito-story__sticky">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-center gap-6 px-5 py-16 md:px-8 md:py-20">
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              {cards.map((card, i) => (
                <article
                  key={card.label}
                  className={`scroll-story-step surface-editorial ${
                    cardsStory.on(i) ? "is-on" : ""
                  }`}
                >
                  <p className="eyebrow mb-3">{card.label}</p>
                  <p className="body-prose text-[0.98rem] text-parchment/80">
                    {card.value}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="text-story__progress" aria-hidden>
            <div
              className="text-story__progress-bar"
              style={{
                width: `${((cardsStory.step + 1) / CARD_STEPS) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Quem conduz — página segura enquanto o scroll revela o card */}
      <div ref={founders.trackRef} className="founders-story">
        <div className="founders-story__sticky">
          <div className="section-pad mx-auto flex h-full max-w-6xl items-center py-16 md:py-20">
            <div className="grid w-full items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div
                className={`scroll-story-step relative aspect-[4/5] overflow-hidden rounded-3xl border border-line ${
                  founders.on(0) ? "is-on" : ""
                }`}
              >
                <SoftImage
                  src={site.foundersImage}
                  alt={manifesto.foundersLabel}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              <div>
                <p
                  className={`scroll-story-step eyebrow mb-4 ${
                    founders.on(1) ? "is-on" : ""
                  }`}
                >
                  Quem conduz
                </p>
                <h3
                  className={`scroll-story-step display text-3xl text-parchment md:text-4xl ${
                    founders.on(1) ? "is-on" : ""
                  }`}
                >
                  {manifesto.foundersLabel}
                </h3>
                <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
                  {manifesto.founders.map((founder, i) => (
                    <div
                      key={founder.name}
                      className={`scroll-story-step surface-editorial ${
                        founders.on(2 + i) ? "is-on" : ""
                      }`}
                    >
                      <p className="display display--tight text-xl text-gold">
                        {founder.name}
                      </p>
                      <p className="body-prose mt-3 text-[0.95rem] text-mute">
                        {founder.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-story__progress" aria-hidden>
            <div
              className="text-story__progress-bar"
              style={{
                width: `${((founders.step + 1) / FOUNDERS_STEPS) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
