import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { CienciaFeStory } from "@/components/sections/CienciaFeStory";

export const metadata: Metadata = {
  title: "Ciência & Fé",
};

export default function CienciaFePage() {
  return (
    <ThemePageShell title="Ciência & Fé">
      <CienciaFeStory />
    </ThemePageShell>
  );
}
