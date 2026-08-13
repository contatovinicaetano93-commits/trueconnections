"use server";

import { revalidatePath } from "next/cache";
import { syncBase44Content, type Base44SyncResult } from "@/lib/base44-sync";
import { requireAdmin } from "@/lib/session";

export async function syncBase44ContentAction(): Promise<
  { ok: true; result: Base44SyncResult } | { ok: false; error: string }
> {
  try {
    await requireAdmin();
    const result = await syncBase44Content();

    revalidatePath("/associados");
    revalidatePath("/associados/cupons");
    revalidatePath("/associados/estudos");
    revalidatePath("/associados/ruach");
    revalidatePath("/admin");
    revalidatePath("/admin/cupons");
    revalidatePath("/admin/estudos");
    revalidatePath("/admin/ruach");

    return { ok: true, result };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Não foi possível sincronizar com o Base44.";
    return { ok: false, error: message };
  }
}
