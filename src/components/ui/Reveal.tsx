"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({
  children,
  className = "",
  y = 28,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { clearProps: "all", opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay]);

  return (
    <div ref={ref} className={`reveal-pending ${className}`}>
      {children}
    </div>
  );
}

/** Headline / paragraph that reveals word-by-word on scroll */
export function RevealText({
  children,
  className = "",
  as: Tag = "p",
  delay = 0,
}: {
  children: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "blockquote";
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el.querySelectorAll(".reveal-word"), { opacity: 1, y: 0 });
      return;
    }

    const words = el.querySelectorAll(".reveal-word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.035,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [children, delay]);

  const parts = children.split(/(\s+)/);

  return (
    <Tag ref={ref as never} className={className}>
      {parts.map((part, i) =>
        /^\s+$/.test(part) ? (
          <span key={i}>{part}</span>
        ) : (
          <span key={i} className="reveal-word inline-block opacity-0">
            {part}
          </span>
        ),
      )}
    </Tag>
  );
}
