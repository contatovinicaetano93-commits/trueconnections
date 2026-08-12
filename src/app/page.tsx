import { SiteNav } from "@/components/layout/SiteNav";
import { HomeClone } from "@/components/home/HomeClone";
import { BootIntro } from "@/components/ui/BootIntro";

export default function Home() {
  return (
    <>
      <BootIntro />
      <SiteNav />
      <main id="topo">
        <HomeClone />
      </main>
    </>
  );
}
