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
    const seen = sessionStorage.getItem("true-boot") === "1";
    if (reduced || seen) {
      setPhase("done");
      setSkip(true);
      return;
    }

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

    return () => window.clearInterval(type);
  }, []);

  useEffect(() => {
    if (phase !== "hold") return;
    const t = window.setTimeout(() => setPhase("exit"), 3200);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = window.setTimeout(() => {
      sessionStorage.setItem("true-boot", "1");
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
      aria-hidden
    >
      <div className="section-pad w-full max-w-3xl">
        <p className="mb-6 text-[0.65rem] tracking-[0.28em] text-gold uppercase">
          {boot.brand}
          <span className="mx-2 text-mute/40">·</span>
          {boot.since}
        </p>
        <p className="display text-[clamp(1.8rem,5vw,3.2rem)] text-parchment">
          <span className="text-gold/80">{"> "}</span>
          {boot.line.slice(0, chars)}
          <span className="boot-cursor ml-1 inline-block h-[0.9em] w-[0.45em] translate-y-[0.12em] bg-gold align-baseline" />
        </p>
      </div>
    </div>
  );
}
