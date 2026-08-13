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
      className="cta-primary"
    >
      <MessageCircle className="h-4 w-4" />
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}
