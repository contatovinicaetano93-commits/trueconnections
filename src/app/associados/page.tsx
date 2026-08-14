import { Suspense } from "react";
import { desc, eq } from "drizzle-orm";
import { AssociadosHub } from "@/components/members/AssociadosHub";
import { MembersShell } from "@/components/members/MembersShell";
import { getDb } from "@/db";
import { bibleStudies } from "@/db/schema";
import { getAssociadosCoupons } from "@/lib/associados-coupons";
import { getAssociadosVideos } from "@/lib/associados-videos";
import { requireMember } from "@/lib/session";

export const metadata = {
  title: "Associados",
};

export default async function AssociadosHomePage() {
  const session = await requireMember();
  const db = getDb();

  const [coupons, studies, ruachVideos, lumeVideos] = await Promise.all([
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
    getAssociadosVideos("ruach"),
    getAssociadosVideos("leme"),
  ]);

  return (
    <MembersShell name={session.user.name} role={session.user.role} hubLayout>
      <Suspense fallback={<p className="text-sm text-[hsl(24_8%_34%)]">Carregando…</p>}>
        <AssociadosHub
          coupons={coupons}
          studies={studies}
          ruachVideos={ruachVideos}
          lumeVideos={lumeVideos}
        />
      </Suspense>
    </MembersShell>
  );
}
