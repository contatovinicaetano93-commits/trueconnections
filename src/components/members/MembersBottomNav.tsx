"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isMemberNavActive, memberNav } from "@/components/members/nav";

export function MembersBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação da área de membros"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_90%)]/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom,0px)] lg:hidden"
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
              className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5"
            >
              {active ? (
                <span
                  className="absolute top-0 h-0.5 w-10 rounded-full bg-[hsl(40_40%_52%)]"
                  aria-hidden
                />
              ) : null}
              <Icon
                size={22}
                strokeWidth={active ? 2.4 : 1.8}
                className={
                  active
                    ? "text-[hsl(40_40%_52%)]"
                    : "text-[hsl(24_8%_34%)]/60"
                }
              />
              <span
                className={`text-[0.65rem] tracking-wide ${
                  active
                    ? "text-[hsl(40_40%_52%)]"
                    : "text-[hsl(24_8%_34%)]/60"
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
