import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { Manifesto } from "@/components/sections/Manifesto";

export const metadata: Metadata = {
  title: "Quem Somos",
};

export default function QuemSomosPage() {
  return (
    <ThemePageShell title="Quem Somos">
      <Manifesto />
    </ThemePageShell>
  );
}
