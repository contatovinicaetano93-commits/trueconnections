"use client";

import { useEffect, useRef, useState } from "react";

export function stepFromProgress(progress: number, stepCount: number) {
  if (progress <= 0) return 0;
  if (progress >= 1) return stepCount - 1;
  return Math.min(stepCount - 1, Math.floor(progress * stepCount));
}

export function useStickyStep(stepCount: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReduced(prefersReduced);
    if (prefersReduced) {
      setStep(stepCount - 1);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const total = Math.max(1, track.offsetHeight - window.innerHeight);
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      setStep(stepFromProgress(scrolled / total, stepCount));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [stepCount]);

  return {
    trackRef,
    step,
    reduced,
    on: (i: number) => reduced || step >= i,
  };
}
