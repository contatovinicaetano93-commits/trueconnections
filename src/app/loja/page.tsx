import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { Loja } from "@/components/sections/Loja";

export const metadata: Metadata = {
  title: "Loja",
};

export default function LojaPage() {
  return (
    <ThemePageShell title="Loja">
      <Loja />
    </ThemePageShell>
  );
}
