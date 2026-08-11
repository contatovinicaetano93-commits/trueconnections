import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { AssociadosSection } from "@/components/sections/AssociadosSection";

export const metadata: Metadata = {
  title: "Associados",
};

export default function SejaAssociadoPage() {
  return (
    <ThemePageShell title="Associados">
      <AssociadosSection />
    </ThemePageShell>
  );
}
