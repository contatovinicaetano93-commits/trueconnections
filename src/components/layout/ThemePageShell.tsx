import Link from "next/link";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function ThemePageShell({
  children,
  title,
  wide = false,
}: {
  children: React.ReactNode;
  title?: string;
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[hsl(24_12%_12%)]">
      <SiteNav />
      <main
        className={`mx-auto px-6 pb-16 pt-8 md:pt-10 ${
          wide ? "max-w-6xl" : "max-w-xl"
        }`}
      >
        <Link
          href="/"
          className="mb-8 inline-flex text-[11px] tracking-[0.16em] text-[hsl(24_12%_12%)]/45 uppercase transition-colors hover:text-[hsl(40_40%_52%)]"
        >
          ← Voltar ao início
        </Link>
        {title ? <span className="sr-only">{title}</span> : null}
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

