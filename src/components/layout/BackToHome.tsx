import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToHome({
  label = "Voltar ao início",
}: {
  label?: string;
}) {
  return (
    <Link
      href="/"
      className="mb-8 inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-[11px] tracking-[0.16em] text-[hsl(24_12%_12%)]/45 uppercase transition-colors hover:text-[hsl(40_40%_52%)]"
    >
      <ArrowLeft size={14} strokeWidth={1.8} aria-hidden />
      {label}
    </Link>
  );
}
