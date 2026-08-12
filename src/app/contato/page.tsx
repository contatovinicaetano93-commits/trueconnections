import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { ContatoSection } from "@/components/sections/ContatoSection";

export const metadata: Metadata = {
  title: "Contato",
};

export default function ContatoPage() {
  return (
    <ThemePageShell title="Contato">
      <ContatoSection />
    </ThemePageShell>
  );
}
