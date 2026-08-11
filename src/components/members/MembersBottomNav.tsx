"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isMemberNavActive, memberNav } from "@/components/members/nav";

export function MembersBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação da área de membros"
      className="members-bottom-nav lg:hidden"
    >
      <div className="mx-auto flex w-full max-w-lg">
        {memberNav.map((item) => {
          const active = isMemberNavActive(pathname, item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="members-bottom-nav__item"
            >
              {active ? (
                <span className="members-bottom-nav__indicator" aria-hidden />
              ) : null}
              <Icon
                size={22}
                strokeWidth={active ? 2.4 : 1.8}
                className={active ? "text-gold" : "text-mute"}
              />
              <span
                className={`text-[0.65rem] tracking-wide ${
                  active ? "text-gold" : "text-mute"
                }`}
              >
                {item.shortLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
