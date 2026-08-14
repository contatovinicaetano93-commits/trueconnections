import { Suspense } from "react";
import { asc, desc, eq } from "drizzle-orm";
import { AssociadosHub } from "@/components/members/AssociadosHub";
import { MembersShell } from "@/components/members/MembersShell";
import { getDb } from "@/db";
import { bibleStudies, ruachVideos } from "@/db/schema";
import { getAssociadosCoupons } from "@/lib/associados-coupons";
import { requireMember } from "@/lib/session";

export const metadata = {
  title: "Associados",
};

export default async function AssociadosHomePage() {
  const session = await requireMember();
  const db = getDb();

  const [coupons, studies, ruachVideoRows] = await Promise.all([
    getAssociadosCoupons(),
    db
      .select({
        id: bibleStudies.id,
        title: bibleStudies.title,
        slug: bibleStudies.slug,
        excerpt: bibleStudies.excerpt,
      })
      .from(bibleStudies)
      .where(eq(bibleStudies.published, true))
      .orderBy(desc(bibleStudies.publishedAt)),
    db
      .select({
        id: ruachVideos.id,
        title: ruachVideos.title,
        description: ruachVideos.description,
        videoUrl: ruachVideos.videoUrl,
        thumbnailUrl: ruachVideos.thumbnailUrl,
      })
      .from(ruachVideos)
      .where(eq(ruachVideos.published, true))
      .orderBy(asc(ruachVideos.sortOrder)),
  ]);

  return (
    <MembersShell name={session.user.name} role={session.user.role} hubLayout>
      <Suspense fallback={<p className="text-sm text-[hsl(24_8%_34%)]">Carregando…</p>}>
        <AssociadosHub coupons={coupons} studies={studies} ruachVideos={ruachVideoRows} />
      </Suspense>
    </MembersShell>
  );
}
