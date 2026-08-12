import { SiteNav } from "@/components/layout/SiteNav";
import { BackToHome } from "@/components/layout/BackToHome";

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
    <div className="flex min-h-screen flex-col bg-[hsl(38_28%_90%)] text-[hsl(24_12%_12%)]">
      <SiteNav />
      <main
        className={`mx-auto w-full flex-1 px-4 py-6 md:px-6 ${
          wide ? "max-w-2xl" : "max-w-lg"
        }`}
      >
        <BackToHome />
        {title ? <span className="sr-only">{title}</span> : null}
        {children}
      </main>
    </div>
  );
}
