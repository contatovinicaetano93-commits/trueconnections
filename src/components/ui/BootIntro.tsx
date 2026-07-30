"use client";

import { useEffect, useState } from "react";
import { boot } from "@/lib/content";

export function BootIntro() {
  const [phase, setPhase] = useState<"typing" | "hold" | "exit" | "done">(
    "typing",
  );
  const [chars, setChars] = useState(0);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      setSkip(true);
      return;
    }

    document.documentElement.classList.add("boot-active");

    let i = 0;
    const full = boot.line;
    const type = window.setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= full.length) {
        window.clearInterval(type);
        setPhase("hold");
      }
    }, 70);

    return () => {
      window.clearInterval(type);
      document.documentElement.classList.remove("boot-active");
    };
  }, []);

  useEffect(() => {
    if (phase !== "hold") return;
    const t = window.setTimeout(() => setPhase("exit"), 3200);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = window.setTimeout(() => {
      document.documentElement.classList.remove("boot-active");
      setPhase("done");
    }, 900);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (skip || phase === "done") return null;

  return (
    <div
      className={`boot-intro fixed inset-0 z-[100] flex items-center justify-center bg-ink ${
        phase === "exit" ? "boot-intro--exit" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={`${boot.brand}. ${boot.line}`}
    >
      <div className="section-pad w-full max-w-3xl">
        <p className="mb-6 text-[0.7rem] font-medium tracking-[0.28em] text-ember uppercase">
          {boot.brand}
          <span className="mx-2 text-mute/50">·</span>
          {boot.since}
        </p>
        <p className="display text-[clamp(1.8rem,5vw,3.2rem)] text-parchment">
          <span className="text-gold">{"> "}</span>
          {boot.line.slice(0, chars)}
          <span className="boot-cursor ml-1 inline-block h-[0.9em] w-[0.45em] translate-y-[0.12em] bg-gold align-baseline" />
        </p>
      </div>
    </div>
  );
}
