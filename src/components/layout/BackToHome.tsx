import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToHome({
  label = "Voltar ao início",
}: {
  label?: string;
}) {
  return (
    <Link
      href="/#sumario"
      className="focus-ring inline-flex items-center gap-2 text-[0.72rem] tracking-[0.16em] text-mute uppercase transition-colors hover:text-gold"
    >
      <ArrowLeft size={16} strokeWidth={1.8} aria-hidden />
      {label}
    </Link>
  );
}
