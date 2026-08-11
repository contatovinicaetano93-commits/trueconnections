import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { TrueActionSection } from "@/components/sections/AssociadosSection";

export const metadata: Metadata = {
  title: "True Action",
};

export default function TrueActionPage() {
  return (
    <ThemePageShell title="True Action">
      <TrueActionSection />
    </ThemePageShell>
  );
}
