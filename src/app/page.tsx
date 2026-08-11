import { Header } from "@/components/layout/Header";
import { BootIntro } from "@/components/ui/BootIntro";
import { Hero } from "@/components/sections/Hero";
import { PortalSummary } from "@/components/sections/PortalSummary";
import { Footer } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <BootIntro />
      <Header />
      <main>
        <Hero />
        <PortalSummary />
      </main>
      <Footer />
    </>
  );
}
