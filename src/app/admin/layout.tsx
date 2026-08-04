import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <AdminShell name={session.user.name} email={session.user.email}>
      {children}
    </AdminShell>
  );
}
