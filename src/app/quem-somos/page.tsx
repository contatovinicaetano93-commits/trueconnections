import type { Metadata } from "next";
import { ThemePageShell } from "@/components/layout/ThemePageShell";
import { ManifestoStory } from "@/components/sections/ManifestoStory";
import { Quote } from "@/components/sections/Quote";
import { PresenceGallery } from "@/components/sections/PresenceGallery";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Quem Somos",
};

export default function QuemSomosPage() {
  return (
    <ThemePageShell title="Quem Somos">
      <ManifestoStory />
      <Quote />
      <PresenceGallery />
      <Faq />
    </ThemePageShell>
  );
}
