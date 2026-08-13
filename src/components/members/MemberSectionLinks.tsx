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
      className="mt-14 border-t border-[hsl(32_14%_78%/0.3)] pt-8"
    >
      <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-[hsl(24_8%_34%)] uppercase">
        Continuar navegando
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/associados"
          className="inline-flex items-center gap-2 rounded-xl border border-[hsl(32_14%_78%/0.45)] px-4 py-2.5 text-sm text-[hsl(24_8%_34%)] transition hover:border-[hsl(40_40%_52%)]/45 hover:text-[hsl(40_40%_52%)]"
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
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition ${
                active
                  ? "border-[hsl(40_40%_52%)]/45 bg-[hsl(40_40%_52%)]/10 text-[hsl(40_40%_42%)]"
                  : "border-[hsl(32_14%_78%/0.45)] text-[hsl(24_8%_34%)] hover:border-[hsl(40_40%_52%)]/45 hover:text-[hsl(40_40%_52%)]"
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
