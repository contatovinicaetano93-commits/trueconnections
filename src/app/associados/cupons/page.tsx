import { desc, eq } from "drizzle-orm";
import { MembersShell } from "@/components/members/MembersShell";
import { getDb } from "@/db";
import { partnerCoupons } from "@/db/schema";
import { requireMember } from "@/lib/session";

export const metadata = {
  title: "Cupons | Associados",
};

export default async function CuponsPage() {
  const session = await requireMember();
  const coupons = await getDb()
    .select()
    .from(partnerCoupons)
    .where(eq(partnerCoupons.active, true))
    .orderBy(desc(partnerCoupons.createdAt));

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <p className="eyebrow mb-3">Parceiros</p>
      <h1 className="display text-[clamp(2rem,4vw,3rem)] text-parchment">
        Cupons conveniados
      </h1>
      <p className="mt-3 max-w-2xl text-mute">
        Use estes códigos com os parceiros da comunidade.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {coupons.length === 0 ? (
          <p className="text-sm text-mute">Nenhum cupom publicado ainda.</p>
        ) : (
          coupons.map((coupon) => (
            <article
              key={coupon.id}
              className="rounded-2xl border border-line bg-card p-6"
            >
              <h2 className="display text-2xl text-parchment">
                {coupon.partnerName}
              </h2>
              {coupon.description ? (
                <p className="mt-2 text-sm text-mute">{coupon.description}</p>
              ) : null}
              <p className="mt-5 inline-block rounded-full bg-gold/20 px-4 py-2 font-mono text-sm tracking-wide text-deep">
                {coupon.code}
              </p>
            </article>
          ))
        )}
      </div>
    </MembersShell>
  );
}
