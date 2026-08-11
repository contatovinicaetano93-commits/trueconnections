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
      className="inline-flex min-h-9 items-center rounded-full border border-line px-3 py-1.5 text-xs font-medium tracking-wide text-mute transition hover:border-gold/45 hover:text-gold active:bg-smoke/60"
    >
      Sair
    </button>
  );
}
