import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { Impacto } from "@/components/sections/Impacto";

export const metadata: Metadata = {
  title: "Impacto Social",
};

export default function ImpactoPage() {
  return (
    <ThemePageShell title="Impacto Social" wide>
      <Impacto />
    </ThemePageShell>
  );
}
