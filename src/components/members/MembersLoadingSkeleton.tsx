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
        <div className="members-header__inner">
          <BrandLogo variant="lockup" size="xs" />
          <Skeleton variant="line" className="h-4 w-20" />
        </div>
        <nav
          className="relative hidden border-t border-line/70 lg:block"
          aria-hidden
        >
          <div className="mx-auto flex max-w-6xl gap-8 px-8 py-3.5">
            <Skeleton variant="line" className="h-3 w-14" />
            <Skeleton variant="line" className="h-3 w-16" />
            <Skeleton variant="line" className="h-3 w-14" />
            <Skeleton variant="line" className="h-3 w-16" />
          </div>
        </nav>
      </header>

      <main className="members-main">
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

      <nav className="members-bottom-nav lg:hidden" aria-hidden>
        <div className="mx-auto flex w-full max-w-lg justify-around py-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-12" />
          ))}
        </div>
      </nav>
    </div>
  );
}
