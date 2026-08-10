"use client";

import { Children, isValidElement } from "react";
import { m } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
};

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Lista com entrada escalonada leve — cupons, benefícios, estudos. */
export function Stagger({ children, className = "" }: StaggerProps) {
  return (
    <m.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        return (
          <m.div key={child.key} variants={item} className="h-full min-w-0">
            {child}
          </m.div>
        );
      })}
    </m.div>
  );
}
