"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await authClient.signOut();
        router.push("/associados/login");
        router.refresh();
      }}
      className="inline-flex min-h-9 items-center rounded-full border border-[hsl(32_14%_78%/0.45)] px-3 py-1.5 text-xs font-medium tracking-wide text-[hsl(24_8%_34%)] transition hover:border-[hsl(40_40%_52%)]/45 hover:text-[hsl(40_40%_52%)] active:bg-[hsl(38_20%_91%/0.5)]"
    >
      Sair
    </button>
  );
}
