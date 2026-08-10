import Link from "next/link";
import { BookOpen, Ticket, Video } from "lucide-react";

const sections = [
  {
    href: "/associados/cupons",
    label: "Cupons",
    icon: Ticket,
  },
  {
    href: "/associados/ruach",
    label: "Ruach",
    icon: Video,
  },
  {
    href: "/associados/estudos",
    label: "Estudos",
    icon: BookOpen,
  },
] as const;

export function MemberSectionLinks({
  current,
}: {
  current: "cupons" | "ruach" | "estudos";
}) {
  return (
    <nav
      aria-label="Outras áreas"
      className="mt-14 border-t border-line pt-8"
    >
      <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-mute uppercase">
        Continuar navegando
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/associados"
          className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-sm text-mute transition hover:border-gold/45 hover:text-gold"
        >
          Início
        </Link>
        {sections.map((section) => {
          const key = section.href.split("/").pop() as typeof current;
          const Icon = section.icon;
          const active = key === current;
          return (
            <Link
              key={section.href}
              href={section.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex items-center gap-2 border px-4 py-2.5 text-sm transition ${
                active
                  ? "border-gold/45 bg-gold/10 text-gold"
                  : "border-line text-mute hover:border-gold/45 hover:text-gold"
              }`}
            >
              <Icon size={15} strokeWidth={1.7} aria-hidden />
              {section.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
