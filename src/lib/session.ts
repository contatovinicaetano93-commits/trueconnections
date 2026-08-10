import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireMember(options?: {
  allowPasswordSetup?: boolean;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/associados/login");
  }

  const [profile] = await getDb()
    .select({
      active: user.active,
      role: user.role,
      mustSetPassword: user.mustSetPassword,
    })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  if (profile && profile.active === false) {
    await auth.api.signOut({ headers: await headers() });
    redirect("/associados/login?disabled=1");
  }

  const mustSetPassword = profile?.mustSetPassword ?? false;

  if (mustSetPassword && !options?.allowPasswordSetup) {
    redirect("/associados/definir-senha");
  }

  return {
    ...session,
    user: {
      ...session.user,
      role: profile?.role ?? session.user.role,
      active: profile?.active ?? true,
      mustSetPassword,
    },
  };
}

export async function requireAdmin() {
  const session = await requireMember();
  if (session.user.role !== "admin") {
    redirect("/associados");
  }
  return session;
}
