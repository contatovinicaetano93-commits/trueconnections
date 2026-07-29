import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Portals } from "@/components/sections/Portals";
import { Manifesto } from "@/components/sections/Manifesto";
import {
  Associados,
  Encontros,
  Eventos,
  TrueAction,
} from "@/components/sections/Community";
import { Impacto } from "@/components/sections/Impacto";
import { Loja, QGs } from "@/components/sections/Loja";
import { CTA, Footer } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Portals />
        <Manifesto />
        <Associados />
        <Encontros />
        <Eventos />
        <Impacto />
        <TrueAction />
        <Loja />
        <QGs />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
