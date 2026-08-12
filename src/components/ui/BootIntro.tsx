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
    }, 55);

    return () => {
      window.clearInterval(type);
      document.documentElement.classList.remove("boot-active");
    };
  }, []);

  useEffect(() => {
    if (mode !== "play" || phase !== "hold") return;
    const t = window.setTimeout(() => setPhase("exit"), 2800);
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

  const typed = boot.line.slice(0, chars);
  const beforeLen = boot.lineBefore.length;
  const before = typed.slice(0, Math.min(chars, beforeLen));
  const accent = typed.slice(beforeLen);

  return (
    <div
      className={`boot-intro fixed inset-0 z-[100] flex items-center justify-center bg-[hsl(38_28%_90%)] ${
        phase === "exit" ? "boot-intro--exit" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={`${boot.brand}. ${boot.line}`}
    >
      <div className="flex w-full max-w-xl flex-col items-center px-6 text-center">
        <BrandLogo variant="lockup" size="xl" priority className="mb-8" />
        <p className="mb-4 text-[0.7rem] font-medium tracking-[0.28em] text-[hsl(40_40%_52%)] uppercase">
          {boot.brand}
          <span className="mx-2 text-[hsl(24_8%_34%)]/40">·</span>
          {boot.since}
        </p>
        <p className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,5vw,3rem)] font-medium tracking-tight text-[hsl(24_12%_12%)]">
          {before}
          <span className="text-[hsl(40_40%_52%)]">{accent}</span>
          <span className="boot-cursor ml-1 inline-block h-[0.9em] w-[0.45em] translate-y-[0.12em] bg-[hsl(40_40%_52%)] align-baseline" />
        </p>
        <div className="mt-8 h-px w-12 bg-[hsl(40_40%_52%)]/40" />
      </div>
    </div>
  );
}
