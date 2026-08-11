import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  Calendar,
  Gift,
  Heart,
  MessageCircle,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { portals } from "@/lib/content";

const iconMap: Record<(typeof portals)[number]["icon"], LucideIcon> = {
  book: BookOpen,
  users: Users,
  gift: Gift,
  calendar: Calendar,
  heart: Heart,
  briefcase: Briefcase,
  bag: ShoppingBag,
  chat: MessageCircle,
};

export function PortalSummary() {
  return (
    <section
      id="sumario"
      className="section-pad scroll-mt-28 border-t border-line py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-xl md:mb-10">
          <p className="eyebrow mb-3">Sumário</p>
          <h2 className="display text-[clamp(1.85rem,4vw,2.75rem)] text-parchment">
            Escolha um tema
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mute md:text-base">
            Cada card abre a página completa daquele tema.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {portals.map((portal) => {
            const Icon = iconMap[portal.icon];
            const className =
              "portal-card group flex min-h-[7.5rem] flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-card/70 p-4 transition hover:border-gold/50 hover:bg-card sm:min-h-[8.5rem] sm:p-5";

            if ("external" in portal && portal.external) {
              return (
                <a
                  key={portal.title}
                  href={portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.6}
                    className="text-gold transition group-hover:scale-105"
                  />
                  <span className="text-left">
                    <span className="block text-[0.95rem] font-medium leading-snug text-parchment sm:text-base">
                      {portal.title}
                    </span>
                    <span className="mt-1 block text-[0.7rem] leading-snug text-mute sm:text-xs">
                      {portal.subtitle}
                    </span>
                  </span>
                </a>
              );
            }

            return (
              <Link key={portal.title} href={portal.href} className={className}>
                <Icon
                  size={22}
                  strokeWidth={1.6}
                  className="text-gold transition group-hover:scale-105"
                />
                <span className="text-left">
                  <span className="block text-[0.95rem] font-medium leading-snug text-parchment sm:text-base">
                    {portal.title}
                  </span>
                  <span className="mt-1 block text-[0.7rem] leading-snug text-mute sm:text-xs">
                    {portal.subtitle}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
