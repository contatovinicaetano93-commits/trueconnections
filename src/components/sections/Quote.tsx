"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { quote } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const ACCENT_WORD = "pertencimento";

function isAccentToken(token: string) {
  return token.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() === ACCENT_WORD;
}

export function Quote() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const words = root.querySelectorAll<HTMLElement>(".quote-word");
    const attr = root.querySelector<HTMLElement>(".quote-attr");
    const knot = root.querySelector<HTMLElement>(".quote-knot");
    const rule = root.querySelector<HTMLElement>(".quote-rule");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([words, attr, knot, rule], {
        clearProps: "all",
        opacity: 1,
        filter: "none",
        y: 0,
        scale: 1,
        scaleX: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.14, filter: "blur(5px)", y: 14 });
      gsap.set(attr, { opacity: 0, y: 12 });
      gsap.set(knot, { opacity: 0, scale: 0.55 });
      gsap.set(rule, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          end: "center 42%",
          scrub: 0.7,
        },
      });

      tl.to(
        knot,
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" },
        0,
      );

      words.forEach((word, i) => {
        tl.to(
          word,
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          0.28 + i * 0.09,
        );
      });

      tl.to(
        rule,
        { scaleX: 1, duration: 0.55, ease: "power2.inOut" },
        "-=0.35",
      );

      tl.to(
        attr,
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        "-=0.2",
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const parts = quote.text.split(/(\s+)/);

  return (
    <section
      ref={rootRef}
      className="quote-signature section-pad relative overflow-hidden border-y border-line bg-smoke/40"
      aria-label="Citação das fundadoras"
    >
      <div className="mesh opacity-40" aria-hidden />
      <div className="quote-signature__inner relative z-10 mx-auto max-w-5xl text-center">
        <span className="quote-knot ornament-knot mx-auto mb-8 block" aria-hidden />

        <blockquote className="display text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.12] tracking-[-0.03em] text-parchment italic">
          <span className="quote-mark" aria-hidden>
            “
          </span>
          {parts.map((part, i) =>
            /^\s+$/.test(part) ? (
              <span key={i}>{part}</span>
            ) : (
              <span
                key={i}
                className={`quote-word inline-block${
                  isAccentToken(part) ? " quote-word--accent" : ""
                }`}
                data-accent={isAccentToken(part) ? "true" : undefined}
              >
                {part}
              </span>
            ),
          )}
          <span className="quote-mark" aria-hidden>
            ”
          </span>
        </blockquote>

        <div
          className="quote-rule mx-auto mt-10 h-px w-24 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
          aria-hidden
        />

        <p className="quote-attr mt-8 text-[0.7rem] tracking-[0.22em] text-ember uppercase">
          {quote.attribution}
        </p>
      </div>
    </section>
  );
}
