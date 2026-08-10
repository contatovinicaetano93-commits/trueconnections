"use client";

import { m } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Entrada leve — opacity + deslocamento curto. Para área de membros/auth. */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 14,
}: FadeInProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease }}
    >
      {children}
    </m.div>
  );
}
