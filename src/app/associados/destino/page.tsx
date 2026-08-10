import { redirect } from "next/navigation";
import { requireMember } from "@/lib/session";

/** Pós-login: admin → /admin, associado → /associados (senha própria já exigida em requireMember). */
export default async function DestinoPage() {
  const session = await requireMember();
  redirect(session.user.role === "admin" ? "/admin" : "/associados");
}
