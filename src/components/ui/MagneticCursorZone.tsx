"use client";

import { useEffect, useRef, useState } from "react";

export function MagneticCursorZone({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        visible: true,
      });
    };
    const onLeave = () => setPos((p) => ({ ...p, visible: false }));

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-[0.55rem] tracking-[0.14em] text-gold uppercase backdrop-blur-sm transition-opacity duration-200 md:flex"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: pos.visible ? 1 : 0,
        }}
        aria-hidden
      >
        ver
      </div>
      <div className={pos.visible ? "md:cursor-none" : ""}>{children}</div>
    </div>
  );
}
