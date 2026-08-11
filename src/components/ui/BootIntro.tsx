"use client";

import { useEffect, useState } from "react";
import { boot } from "@/lib/content";
import { BrandLogo } from "@/components/ui/BrandLogo";

const BOOT_SEEN_KEY = "tc-boot-seen";

export function BootIntro() {
  const [mode, setMode] = useState<"pending" | "play" | "skip">("pending");
  const [phase, setPhase] = useState<"typing" | "hold" | "exit" | "done">(
    "typing",
  );
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.localStorage.getItem(BOOT_SEEN_KEY) === "1";

    if (reduced || seen) {
      setMode("skip");
      return;
    }

    setMode("play");
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
    if (mode !== "play" || phase !== "hold") return;
    const t = window.setTimeout(() => setPhase("exit"), 3200);
    return () => window.clearTimeout(t);
  }, [mode, phase]);

  useEffect(() => {
    if (mode !== "play" || phase !== "exit") return;
    const t = window.setTimeout(() => {
      document.documentElement.classList.remove("boot-active");
      window.localStorage.setItem(BOOT_SEEN_KEY, "1");
      setPhase("done");
    }, 900);
    return () => window.clearTimeout(t);
  }, [mode, phase]);

  if (mode === "pending" || mode === "skip" || phase === "done") return null;

  return (
    <div
      className={`boot-intro fixed inset-0 z-[100] flex items-center justify-center bg-ink ${
        phase === "exit" ? "boot-intro--exit" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={`${boot.brand}. ${boot.line}`}
    >
      <div className="section-pad flex w-full max-w-3xl flex-col items-center text-center md:items-start md:text-left">
        <BrandLogo variant="mark" size="xl" priority className="-mb-1" />
        <p className="mb-6 mt-0 text-[0.7rem] font-medium tracking-[0.28em] text-ember uppercase">
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
