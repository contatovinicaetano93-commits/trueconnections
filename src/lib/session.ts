import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireMember() {
  const session = await getSession();
  if (!session) {
    redirect("/associados/login");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireMember();
  if (session.user.role !== "admin") {
    redirect("/associados");
  }
  return session;
}
