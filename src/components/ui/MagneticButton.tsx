"use client";

import { useRef } from "react";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function MagneticButton({
  href,
  children,
  className = "",
  external,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`focus-ring inline-flex items-center justify-center transition-transform duration-300 ease-out will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
