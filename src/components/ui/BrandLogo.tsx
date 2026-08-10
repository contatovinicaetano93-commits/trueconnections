import Image from "next/image";
import { site } from "@/lib/content";

type BrandLogoProps = {
  /** mark = nó dourado; lockup = nó + TRUE CONNECTION */
  variant?: "mark" | "lockup";
  className?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizes = {
  sm: { box: "h-14 w-14", lockup: "h-16 w-[7.5rem]" },
  md: { box: "h-[4.75rem] w-[4.75rem]", lockup: "h-[5.25rem] w-[10rem]" },
  lg: { box: "h-28 w-28", lockup: "h-32 w-[14rem]" },
  xl: { box: "h-36 w-36", lockup: "h-40 w-[18rem]" },
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
      className={`relative inline-flex shrink-0 overflow-hidden ${dim} ${className}`}
    >
      <Image
        src={src}
        alt={site.name}
        fill
        className="object-contain object-center"
        sizes={variant === "lockup" ? "320px" : "180px"}
        priority={priority}
      />
    </span>
  );
}
