import { BrandLogo } from "@/components/ui/BrandLogo";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

/** Shell de loading da área de membros — sem sessão, só estrutura. */
export function MembersLoadingSkeleton() {
  return (
    <div className="members-shell bg-ink text-parchment" aria-busy="true">
      <div className="members-shell__glow" aria-hidden>
        <div className="mesh opacity-50" />
      </div>

      <header className="members-header">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8 md:py-4">
          <BrandLogo variant="lockup" size="md" />
          <Skeleton variant="line" className="h-4 w-28" />
        </div>
        <nav className="relative border-t border-line/70" aria-hidden>
          <div className="mx-auto flex max-w-6xl gap-8 px-5 py-3.5 md:px-8">
            <Skeleton variant="line" className="h-3 w-14" />
            <Skeleton variant="line" className="h-3 w-16" />
            <Skeleton variant="line" className="h-3 w-14" />
            <Skeleton variant="line" className="h-3 w-16" />
          </div>
        </nav>
      </header>

      <main className="relative z-[1] mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <p className="sr-only">Carregando área de membros…</p>
        <div className="max-w-2xl">
          <Skeleton variant="circle" className="mb-4 h-8 w-8" />
          <Skeleton variant="line" className="mb-3 h-3 w-24" />
          <Skeleton className="mb-4 h-10 w-full max-w-md" />
          <SkeletonText lines={2} className="max-w-lg" />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="members-benefit pointer-events-none">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="mt-5 h-7 w-2/3" />
              <SkeletonText lines={2} className="mt-3" />
              <Skeleton variant="line" className="mt-8 h-3 w-20" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
