import {
  BookOpen,
  Home,
  LayoutDashboard,
  Ticket,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  hint?: string;
};

export const adminPrimaryNav: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Visão geral",
    icon: LayoutDashboard,
    hint: "O que publicar agora",
  },
  {
    href: "/admin/cupons",
    label: "Cupons",
    icon: Ticket,
    hint: "Parceiros conveniados",
  },
  {
    href: "/admin/ruach",
    label: "Ruach",
    icon: Video,
    hint: "Aulas em vídeo",
  },
  {
    href: "/admin/estudos",
    label: "Estudos",
    icon: BookOpen,
    hint: "Textos bíblicos",
  },
];

export const adminSecondaryNav: AdminNavItem[] = [
  {
    href: "/admin/usuarios",
    label: "Usuários",
    icon: Users,
    hint: "Próximo ciclo",
  },
  {
    href: "/associados",
    label: "Ver como associado",
    icon: Home,
    hint: "Área de consumo",
  },
];
