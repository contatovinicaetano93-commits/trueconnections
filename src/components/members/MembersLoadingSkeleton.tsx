import Image from "next/image";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";
import { site } from "@/lib/content";

/** Shell de loading da área de membros — sem sessão, só estrutura. */
export function MembersLoadingSkeleton() {
  return (
    <div
      className="flex min-h-screen flex-col bg-[hsl(38_28%_90%)] text-[hsl(24_12%_12%)]"
      aria-busy="true"
    >
      <header className="sticky top-0 z-40 border-b border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_90%)]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 md:px-8">
          <Image
            src={site.logo}
            alt=""
            width={160}
            height={50}
            className="h-10 w-auto object-contain opacity-70"
          />
          <Skeleton variant="line" className="h-4 w-20" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:px-6 md:py-10 lg:max-w-4xl lg:pb-10">
        <p className="sr-only">Carregando área de membros…</p>
        <div className="max-w-2xl">
          <Skeleton variant="line" className="mb-3 h-3 w-24" />
          <Skeleton className="mb-4 h-10 w-full max-w-md" />
          <SkeletonText lines={2} className="max-w-lg" />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex min-h-[105px] flex-col items-center justify-center rounded-2xl bg-white/[0.12] p-5 ring-1 ring-black/[0.04] md:min-h-[118px] md:p-6"
            >
              <Skeleton variant="circle" className="mb-3 h-10 w-10" />
              <Skeleton variant="line" className="h-3 w-16" />
            </div>
          ))}
        </div>
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_90%)]/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom,0px)] lg:hidden"
        aria-hidden
      >
        <div className="mx-auto flex w-full max-w-lg justify-around py-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-12" />
          ))}
        </div>
      </nav>
    </div>
  );
}
