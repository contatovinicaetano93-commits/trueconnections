import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { EncontrosStory } from "@/components/sections/EncontrosStory";

export const metadata: Metadata = {
  title: "Encontros gratuitos",
};

export default function EncontrosPage() {
  return (
    <ThemePageShell title="Encontros gratuitos">
      <EncontrosStory />
    </ThemePageShell>
  );
}
