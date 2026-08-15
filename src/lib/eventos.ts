import { fetchBase44Events } from "@/lib/base44-client";

export type EventoItem = {
  id: string;
  title: string;
  place: string;
  status: string;
  dateLabel: string;
  timeLabel: string | null;
  description: string | null;
  price: string | null;
  imageUrl: string | null;
  category: string | null;
};

function formatEventDate(date: Date) {
  const dateLabel = new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(date);

  const timeLabel = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(date);

  return { dateLabel, timeLabel };
}

function categoryLabel(category: string | null | undefined) {
  if (!category) return "Evento";
  const labels: Record<string, string> = {
    "bem-estar": "Bem-estar",
    fé: "Fé",
    fe: "Fé",
  };
  return labels[category.toLowerCase()] ?? category;
}

export async function getUpcomingEventos(): Promise<EventoItem[]> {
  try {
    const events = await fetchBase44Events();
    const now = Date.now();

    return events
      .map((event) => {
        const startsAt = event.date ? new Date(event.date) : null;
        if (!startsAt || Number.isNaN(startsAt.getTime())) return null;

        const { dateLabel, timeLabel } = formatEventDate(startsAt);

        return {
          id: event.id,
          title: event.title.trim(),
          place: event.location?.trim() || "Local a confirmar",
          status: categoryLabel(event.category),
          dateLabel,
          timeLabel,
          description: event.description?.trim() || null,
          price: event.price?.trim() || null,
          imageUrl: event.image_url?.trim() || null,
          category: event.category ?? null,
          startsAtMs: startsAt.getTime(),
        };
      })
      .filter((event): event is NonNullable<typeof event> => event !== null)
      .filter((event) => event.startsAtMs >= now - 60 * 60 * 1000)
      .sort((a, b) => a.startsAtMs - b.startsAtMs)
      .map(({ startsAtMs: _startsAtMs, ...event }) => event);
  } catch (error) {
    console.error("[eventos] Base44 fetch failed:", error);
    return [];
  }
}
