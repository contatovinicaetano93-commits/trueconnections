import { Header } from "@/components/layout/Header";
import { BootIntro } from "@/components/ui/BootIntro";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Hero } from "@/components/sections/Hero";
import { Portals } from "@/components/sections/Portals";
import { Manifesto } from "@/components/sections/Manifesto";
import { Quote } from "@/components/sections/Quote";
import { FullBleed } from "@/components/sections/FullBleed";
import {
  ClubStrip,
  Encontros,
  Eventos,
} from "@/components/sections/Community";
import { Impacto } from "@/components/sections/Impacto";
import { PresenceGallery } from "@/components/sections/PresenceGallery";
import { Loja, QGs } from "@/components/sections/Loja";
import { Faq } from "@/components/sections/Faq";
import { CTA, Footer } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <BootIntro />
      <Header />
      <main>
        <Hero />
        <Portals />
        <GoldDivider />
        <Manifesto />
        <Quote />
        <FullBleed />
        <ClubStrip />
        <Encontros />
        <GoldDivider />
        <Eventos />
        <Impacto />
        <PresenceGallery />
        <Loja />
        <QGs />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
