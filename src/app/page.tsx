import { SiteNav } from "@/components/layout/SiteNav";
import { HomeClone } from "@/components/home/HomeClone";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="topo">
        <HomeClone />
      </main>
    </>
  );
}
