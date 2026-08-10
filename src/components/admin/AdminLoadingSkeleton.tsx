import { BrandLogo } from "@/components/ui/BrandLogo";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

/** Loading do painel admin. */
export function AdminLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-ink text-parchment" aria-busy="true">
      <p className="sr-only">Carregando painel…</p>
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-dvh w-[16.5rem] shrink-0 flex-col border-r border-line bg-smoke/55 lg:flex">
          <div className="border-b border-line px-5 py-6">
            <BrandLogo variant="mark" size="sm" />
            <Skeleton variant="line" className="mt-4 h-3 w-24" />
          </div>
          <div className="space-y-2 px-4 py-5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-full rounded-xl" />
            ))}
          </div>
        </aside>
        <div className="flex-1 px-5 py-8 md:px-8">
          <Skeleton className="mb-3 h-8 w-48" />
          <SkeletonText lines={2} className="mb-8 max-w-md" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-36 w-full rounded-2xl" />
            <Skeleton className="h-36 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
