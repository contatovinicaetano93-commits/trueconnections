import Image from "next/image";
import { site } from "@/lib/content";

type BrandLogoProps = {
  /** mark = nó dourado; lockup = nó + TRUE CONNECTION */
  variant?: "mark" | "lockup";
  className?: string;
  priority?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

/** Framed assets are tight crops — sizes are display boxes, not padded squares. */
const sizes = {
  xs: { box: "h-12 w-12", lockup: "h-11 w-[8.5rem]" },
  sm: { box: "h-16 w-16", lockup: "h-14 w-[11rem]" },
  md: { box: "h-20 w-20", lockup: "h-16 w-[13rem]" },
  lg: { box: "h-28 w-28", lockup: "h-[4.5rem] w-[18rem]" },
  xl: { box: "h-36 w-36", lockup: "h-24 w-[22rem]" },
} as const;

export function BrandLogo({
  variant = "mark",
  className = "",
  priority = false,
  size = "md",
}: BrandLogoProps) {
  const src = variant === "lockup" ? site.logo : site.mark;
  const dim = sizes[size][variant === "lockup" ? "lockup" : "box"];

  return (
    <span
      className={`relative inline-flex shrink-0 overflow-visible ${dim} ${className}`}
    >
      <Image
        src={src}
        alt={site.name}
        fill
        className="object-contain object-center"
        sizes={variant === "lockup" ? "360px" : "160px"}
        priority={priority}
      />
    </span>
  );
}
