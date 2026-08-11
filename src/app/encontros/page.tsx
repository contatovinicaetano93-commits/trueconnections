import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { EncontrosStory } from "@/components/sections/EncontrosStory";
import { FullBleed } from "@/components/sections/FullBleed";
import { QgsStory } from "@/components/sections/QgsStory";

export const metadata: Metadata = {
  title: "Encontros",
};

export default function EncontrosPage() {
  return (
    <ThemePageShell title="Encontros">
      <EncontrosStory />
      <FullBleed />
      <QgsStory />
    </ThemePageShell>
  );
}
