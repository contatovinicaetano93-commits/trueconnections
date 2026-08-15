import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { Eventos } from "@/components/sections/Eventos";
import { getUpcomingEventos } from "@/lib/eventos";

export const metadata: Metadata = {
  title: "Próximos Eventos",
  description: "Encontros, shows e experiências da True Connections.",
};

export default async function EventosPage() {
  const items = await getUpcomingEventos();
  return (
    <ThemePageShell title="Próximos Eventos" wide>
      <Eventos items={items} />
    </ThemePageShell>
  );
}
