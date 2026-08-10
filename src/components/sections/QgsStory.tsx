"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { qgs } from "@/lib/content";
import { SoftImage } from "@/components/ui/SoftImage";
import { useStickyStep } from "@/hooks/useStickyStep";

gsap.registerPlugin(ScrollTrigger);

const STEP_COUNT = 3;

export function QgsStory() {
  const { trackRef, step, on } = useStickyStep(STEP_COUNT);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = mediaRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const frames = root.querySelectorAll<HTMLElement>(".surface-media__img");
      frames.forEach((frame) => {
        gsap.fromTo(
          frame,
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: "none",
            scrollTrigger: {
              trigger: frame.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="qgs" className="bg-smoke/40">
      <div ref={trackRef} className="text-story">
        <div className="text-story__sticky">
          <div className="mx-auto flex h-full max-w-6xl items-center px-5 py-20 md:px-8 md:py-28">
            <div className="max-w-2xl">
              <p className={`scroll-story-step eyebrow mb-4 ${on(0) ? "is-on" : ""}`}>
                Mapa
              </p>
              <h2
                className={`scroll-story-step display text-[clamp(2.4rem,5vw,4.25rem)] text-parchment ${
                  on(1) ? "is-on" : ""
                }`}
              >
                {qgs.title}
              </h2>
              <p
                className={`scroll-story-step body-prose mt-5 max-w-xl text-mute ${
                  on(2) ? "is-on" : ""
                }`}
              >
                Lugares onde a comunidade se encontra — café, conversa e presença de verdade.
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

      <div ref={mediaRef} className="section-pad mx-auto max-w-6xl pb-20 md:pb-28">
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {qgs.items.map((item, i) => (
            <article
              key={item.name}
              data-reveal
              style={{ "--reveal-delay": i * 80 } as CSSProperties}
              className="surface-media"
            >
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
                <p className="mt-4 text-sm tracking-wide text-gold-soft">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
