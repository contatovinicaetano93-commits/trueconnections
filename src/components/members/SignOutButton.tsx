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
      className="text-sm text-mute transition hover:text-gold"
    >
      Sair
    </button>
  );
}
