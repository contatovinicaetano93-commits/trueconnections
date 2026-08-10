"use client";

import { useEffect, useState } from "react";
import { hero, heroSlides, site } from "@/lib/content";
import { SoftImage } from "@/components/ui/SoftImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useStickyStep } from "@/hooks/useStickyStep";

const STEP_COUNT = 5;

export function HeroStory() {
  const { trackRef, step, on } = useStickyStep(STEP_COUNT);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="topo" ref={trackRef} className="hero-story">
      <div className="hero-story__sticky">
        <div className="absolute inset-0">
          {heroSlides.map((item, i) => (
            <div
              key={item.src}
              className={`hero-story__slide absolute inset-0 transition-opacity duration-1000 ${
                i === slide ? "is-active opacity-100" : "opacity-0"
              }`}
            >
              <div
                key={`${item.src}-${i === slide ? slide : "idle"}`}
                className="hero-story__slide-media"
              >
                <SoftImage
                  src={item.src}
                  alt={item.caption}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
          ))}
          <div
            className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/75 to-ink"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_20%,color-mix(in_srgb,var(--gold)_14%,transparent),transparent_70%)]"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-5 md:px-8">
          <div className="mx-auto w-full max-w-3xl pt-24 pb-12 text-center md:pt-28">
            <p className={`hero-story__step eyebrow mb-5 ${on(0) ? "is-on" : ""}`}>
              {hero.eyebrow}
            </p>

            <h1
              className={`hero-story__step display text-[clamp(2.75rem,7.5vw,5.4rem)] text-parchment ${
                on(1) ? "is-on" : ""
              }`}
            >
              {hero.headlineBefore}{" "}
              <span className="gold-text display--accent text-[1.08em]">
                {hero.headlineAccent}
              </span>
            </h1>

            <p
              className={`hero-story__step body-prose mx-auto mt-6 max-w-xl text-mute md:text-lg ${
                on(2) ? "is-on" : ""
              }`}
            >
              {hero.body}
            </p>

            <p
              className={`hero-story__step display display--tight mt-8 text-xl text-parchment md:text-2xl ${
                on(3) ? "is-on" : ""
              }`}
            >
              Mais do que uma plataforma.{" "}
              <span className="text-gold">Um movimento.</span>
            </p>

            <div
              className={`hero-story__step mt-8 flex flex-wrap items-center justify-center gap-3 ${
                on(4) ? "is-on" : ""
              }`}
            >
              <MagneticButton
                href={site.whatsapp}
                external
                className="rounded-full bg-gold px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase text-ink hover:bg-gold-soft"
              >
                Falar com a True
              </MagneticButton>
              <a
                href="#manifesto"
                className="focus-ring rounded-full border border-line bg-card/60 px-6 py-3.5 text-[0.72rem] tracking-[0.16em] text-mute uppercase backdrop-blur-sm transition-colors hover:text-gold"
              >
                Quem somos
              </a>
            </div>
          </div>
        </div>

        <div className="hero-story__progress" aria-hidden>
          <div
            className="hero-story__progress-bar"
            style={{ width: `${((step + 1) / STEP_COUNT) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
