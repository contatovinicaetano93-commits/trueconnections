"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero, heroSlides, site } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SoftImage } from "@/components/ui/SoftImage";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const accent = useRef<HTMLSpanElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = accent.current?.querySelectorAll(".letter");
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const velocity = gsap.utils.clamp(-22, 22, (y - lastY) * 0.4);
      lastY = y;
      if (letters) {
        gsap.to(letters, {
          y: velocity,
          skewX: velocity * 0.18,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });
      tl.from(".hero-ornament", { opacity: 0, scale: 0.8, duration: 0.8 })
        .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.7 }, "-=0.4")
        .from(".hero-before", { opacity: 0, y: 28, duration: 0.85 }, "-=0.35")
        .from(
          letters ?? [],
          {
            opacity: 0,
            y: 56,
            rotateX: -55,
            stagger: 0.05,
            duration: 0.95,
            ease: "power4.out",
          },
          "-=0.55",
        )
        .from(".hero-body", { opacity: 0, y: 24, duration: 0.9 }, "-=0.45")
        .from(".hero-cta", { opacity: 0, y: 18, duration: 0.7 }, "-=0.55")
        .from(".hero-visual", { opacity: 0, y: 36, duration: 1.1 }, "-=0.9");

      if (visual.current) {
        gsap.to(visual.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, el);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  const accentLetters = hero.headlineAccent.split("");
  const current = heroSlides[slide];

  return (
    <section
      id="topo"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36"
    >
      <div className="mesh mesh--strong" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--ink)_82%)]"
        aria-hidden
      />

      <div className="section-pad relative z-10 mx-auto grid w-full max-w-7xl items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="text-center md:text-left">
          <div className="hero-ornament mb-5 flex justify-center md:justify-start" aria-hidden>
            <span className="ornament-knot" />
          </div>
          <p className="hero-eyebrow eyebrow mb-6">{hero.eyebrow}</p>
          <h1 className="display mx-auto max-w-4xl text-[clamp(3rem,9vw,7rem)] leading-[0.92] tracking-[-0.04em] text-parchment md:mx-0">
            <span className="hero-before block font-light italic text-parchment/85">
              {hero.headlineBefore}
            </span>
            <span
              ref={accent}
              className="mt-1 inline-flex flex-wrap justify-center font-medium text-gold md:justify-start"
              aria-label={hero.headlineAccent}
            >
              {accentLetters.map((char, i) => (
                <span
                  key={`${char}-${i}`}
                  className="letter inline-block origin-bottom will-change-transform"
                  style={{ perspective: 600 }}
                >
                  {char}
                </span>
              ))}
              <span className="text-parchment">.</span>
            </span>
          </h1>

          <p className="hero-body mx-auto mt-8 max-w-xl text-base leading-relaxed text-mute/80 md:mx-0 md:text-lg">
            {hero.body}
          </p>

          <div className="hero-cta mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <MagneticButton
              href="#manifesto"
              className="rounded-full bg-gold px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase text-ink hover:bg-gold-soft"
            >
              Quem somos
            </MagneticButton>
            <MagneticButton
              href={site.whatsapp}
              external
              className="group rounded-full border border-parchment/15 px-7 py-3.5 text-[0.72rem] tracking-[0.16em] uppercase text-parchment/70 hover:border-gold/45 hover:text-gold"
            >
              Fale conosco
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </MagneticButton>
          </div>

          <a
            href="#portais"
            className="hero-cta mt-12 inline-flex flex-col items-center gap-2 text-[0.65rem] tracking-[0.24em] text-mute/55 uppercase md:items-start"
          >
            Scroll
            <span className="animate-nudge text-gold" aria-hidden>
              ↓
            </span>
          </a>
        </div>

        <div className="hero-visual relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div
            ref={visual}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ash shadow-[0_30px_80px_-40px_rgba(34,30,27,0.45)]"
          >
            {heroSlides.map((item, i) => (
              <div
                key={item.src}
                className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
                  i === slide ? "opacity-100" : "opacity-0"
                }`}
              >
                <SoftImage
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover scale-[1.04]"
                  sizes="(max-width: 1024px) 90vw, 480px"
                  priority={i === 0}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-5 text-sm text-ink/95 transition-opacity duration-500">
              {current.caption}
            </p>
            <div className="absolute top-4 right-4 flex gap-1.5">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === slide ? "w-5 bg-gold" : "w-1.5 bg-ink/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
