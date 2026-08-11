export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

/** Plain text wrapper — scroll word-reveal removed for short theme pages. */
export function RevealText({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "blockquote";
  delay?: number;
}) {
  return <Tag className={className}>{children}</Tag>;
}
