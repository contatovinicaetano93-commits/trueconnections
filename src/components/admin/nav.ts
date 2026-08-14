import {
  BookOpen,
  Gift,
  Home,
  LayoutDashboard,
  Sparkles,
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
    hint: "Hub de associados",
  },
  {
    href: "/admin/beneficios",
    label: "Benefícios",
    icon: Gift,
    hint: "Cupons e parceiros",
  },
  {
    href: "/admin/ruach",
    label: "Método Ruach",
    icon: Video,
    hint: "Aulas em vídeo",
  },
  {
    href: "/admin/estudos",
    label: "Estudos",
    icon: BookOpen,
    hint: "Textos bíblicos",
  },
  {
    href: "/admin/leme",
    label: "Instituto Lume",
    icon: Sparkles,
    hint: "Ciência & fé",
  },
];

export const adminSecondaryNav: AdminNavItem[] = [
  {
    href: "/admin/usuarios",
    label: "Usuários",
    icon: Users,
    hint: "Acessos e papéis",
  },
  {
    href: "/associados",
    label: "Ver como associado",
    icon: Home,
    hint: "Prévia do hub",
  },
];

export const associadosHubModules = [
  {
    href: "/admin/beneficios",
    tab: "beneficios",
    label: "Benefícios",
    icon: Gift,
    guide: "Cupons, ofertas e links de parceiros.",
  },
  {
    href: "/admin/ruach",
    tab: "ruach",
    label: "Método Ruach",
    icon: Video,
    guide: "Aulas de respiração, movimento e espiritualidade.",
  },
  {
    href: "/admin/estudos",
    tab: "estudos",
    label: "Estudos",
    icon: BookOpen,
    guide: "Estudos bíblicos por livro (ex.: Romanos).",
  },
  {
    href: "/admin/leme",
    tab: "leme",
    label: "Instituto Lume",
    icon: Sparkles,
    guide: "Vídeos de ciência, neuroplasticidade e fé.",
  },
] as const;
