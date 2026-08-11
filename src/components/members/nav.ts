import { BookOpen, Home, Ticket, Video, type LucideIcon } from "lucide-react";

export type MemberNavItem = {
  href: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  exact?: boolean;
};

export const memberNav: MemberNavItem[] = [
  { href: "/associados", label: "Início", shortLabel: "Início", icon: Home, exact: true },
  { href: "/associados/cupons", label: "Cupons", shortLabel: "Cupons", icon: Ticket },
  { href: "/associados/ruach", label: "Ruach", shortLabel: "Ruach", icon: Video },
  { href: "/associados/estudos", label: "Estudos", shortLabel: "Estudos", icon: BookOpen },
];

export function isMemberNavActive(pathname: string, item: MemberNavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
