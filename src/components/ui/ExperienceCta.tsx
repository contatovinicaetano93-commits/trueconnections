import { ArrowRight, MessageCircle } from "lucide-react";

export function ExperienceCta({
  label,
  message,
  phone,
}: {
  label: string;
  message?: string;
  phone?: string;
}) {
  const href = `https://wa.me/${phone ?? "5511990267044"}?text=${encodeURIComponent(
    message ??
      "Olá! Vim pelo site da True Connection e gostaria de levar uma experiência para minha empresa/cidade.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(24_14%_14%)] py-3 font-[family-name:var(--font-body)] text-sm font-medium text-[hsl(38_28%_92%)] transition-all hover:bg-[hsl(24_14%_14%)]/80"
    >
      <MessageCircle className="h-4 w-4" />
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}
