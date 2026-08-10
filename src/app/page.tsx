import { Header } from "@/components/layout/Header";
import { BootIntro } from "@/components/ui/BootIntro";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SideGuide } from "@/components/ui/SideGuide";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HeroStory } from "@/components/sections/HeroStory";
import { ManifestoStory } from "@/components/sections/ManifestoStory";
import { Quote } from "@/components/sections/Quote";
import { ClubeERede, Eventos } from "@/components/sections/Community";
import { EncontrosStory } from "@/components/sections/EncontrosStory";
import { FullBleed } from "@/components/sections/FullBleed";
import { QgsStory } from "@/components/sections/QgsStory";
import { PresenceGallery } from "@/components/sections/PresenceGallery";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Impacto } from "@/components/sections/Impacto";
import { Loja } from "@/components/sections/Loja";
import { Faq } from "@/components/sections/Faq";
import { CTA, Footer } from "@/components/sections/CTA";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <BootIntro />
      <ScrollReveal />
      <ScrollProgress />
      <Header />
      <SideGuide />
      <main>
        <HeroStory />

        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div
            data-reveal="soft"
            className="my-8 h-px origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </div>

        <ManifestoStory />
        <Quote />

        <ClubeERede />

        <EncontrosStory />
        <FullBleed />
        <QgsStory />
        <PresenceGallery />

        <div className="overflow-hidden border-y border-line bg-smoke/30 py-1">
          <Marquee />
        </div>

        <Eventos />

        <StatsStrip />
        <Impacto />

        <Loja />

        <GoldDivider />

        <Faq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
