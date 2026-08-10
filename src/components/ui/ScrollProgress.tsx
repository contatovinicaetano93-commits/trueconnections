"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setWidth(max > 0 ? (window.scrollY / max) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[70] h-0.5 bg-gradient-to-r from-gold via-gold-soft to-gold/40 transition-[width] duration-300"
      style={{
        width: `${width}%`,
        boxShadow: "0 0 10px color-mix(in srgb, var(--gold) 45%, transparent)",
      }}
      aria-hidden
    />
  );
}
