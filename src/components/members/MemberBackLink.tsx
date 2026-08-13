import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function MemberBackLink({
  href,
  label = "Voltar",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-[hsl(24_8%_34%)] transition hover:text-[hsl(40_40%_52%)]"
    >
      <ArrowLeft size={16} aria-hidden />
      {label}
    </Link>
  );
}
