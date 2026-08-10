type SkeletonProps = {
  className?: string;
  /** Forma: bloco, linha de texto, círculo ou mídia */
  variant?: "block" | "line" | "circle" | "media";
};

/** Placeholder de carregamento no tom da marca (shimmer dourado suave). */
export function Skeleton({
  className = "",
  variant = "block",
}: SkeletonProps) {
  const shape =
    variant === "line"
      ? "h-3 rounded-sm"
      : variant === "circle"
        ? "rounded-full aspect-square"
        : variant === "media"
          ? "aspect-video w-full"
          : "rounded-sm";

  return (
    <div
      className={`skeleton ${shape} ${className}`}
      aria-hidden
    />
  );
}

export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2.5 ${className}`} aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant="line"
          className={i === lines - 1 ? "w-2/3" : "w-full"}
        />
      ))}
    </div>
  );
}
