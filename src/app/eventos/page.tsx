import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { Eventos } from "@/components/sections/Community";

export const metadata: Metadata = {
  title: "Próximos Eventos",
};

export default function EventosPage() {
  return (
    <ThemePageShell title="Próximos Eventos">
      <Eventos />
    </ThemePageShell>
  );
}
