import { desc } from "drizzle-orm";
import {
  deleteCoupon,
  saveCoupon,
} from "@/app/actions/members";
import { MembersShell } from "@/components/members/MembersShell";
import { getDb } from "@/db";
import { partnerCoupons } from "@/db/schema";
import { requireAdmin } from "@/lib/session";

export const metadata = {
  title: "Admin · Cupons",
};

export default async function AdminCuponsPage() {
  const session = await requireAdmin();
  const coupons = await getDb()
    .select()
    .from(partnerCoupons)
    .orderBy(desc(partnerCoupons.createdAt));

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <h1 className="display text-3xl text-parchment">Cupons</h1>

      <form
        action={saveCoupon}
        className="mt-8 grid max-w-2xl gap-3 rounded-2xl border border-line bg-card p-6"
      >
        <input
          name="partnerName"
          placeholder="Parceiro"
          required
          className="rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
        />
        <input
          name="code"
          placeholder="Código"
          required
          className="rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
        />
        <textarea
          name="description"
          placeholder="Descrição"
          rows={3}
          className="rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
        />
        <label className="flex items-center gap-2 text-sm text-mute">
          <input name="active" type="checkbox" defaultChecked />
          Ativo
        </label>
        <button
          type="submit"
          className="justify-self-start rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-deep"
        >
          Publicar cupom
        </button>
      </form>

      <div className="mt-10 space-y-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-line bg-card p-5"
          >
            <div>
              <p className="display text-xl">{coupon.partnerName}</p>
              <p className="mt-1 font-mono text-sm text-gold">{coupon.code}</p>
              {coupon.description ? (
                <p className="mt-2 text-sm text-mute">{coupon.description}</p>
              ) : null}
              <p className="mt-2 text-xs text-mute">
                {coupon.active ? "Ativo" : "Inativo"}
              </p>
            </div>
            <form action={deleteCoupon}>
              <input type="hidden" name="id" value={coupon.id} />
              <button type="submit" className="text-sm text-mute hover:text-ember">
                Remover
              </button>
            </form>
          </div>
        ))}
      </div>
    </MembersShell>
  );
}
