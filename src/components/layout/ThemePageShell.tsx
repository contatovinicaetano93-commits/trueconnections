import { Header } from "@/components/layout/Header";
import { BackToHome } from "@/components/layout/BackToHome";
import { Footer } from "@/components/sections/CTA";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ThemePageShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <>
      <ScrollReveal />
      <Header />
      <main className="pt-[6.25rem] md:pt-32">
        <div className="section-pad mx-auto max-w-6xl pt-6 md:pt-8">
          <BackToHome />
          {title ? <span className="sr-only">{title}</span> : null}
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
}
