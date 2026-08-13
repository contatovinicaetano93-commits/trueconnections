import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { EncontrosStory } from "@/components/sections/EncontrosStory";

export const metadata: Metadata = {
  title: "Encontros & Experiências",
};

export default function EncontrosPage() {
  return (
    <ThemePageShell title="Encontros & Experiências">
      <EncontrosStory />
    </ThemePageShell>
  );
}
