"use client";

import { adminGhostBtnClass } from "@/components/admin/ui";

export function ConfirmDeleteButton({
  action,
  id,
  label,
  className = adminGhostBtnClass,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  label: string;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (
          !window.confirm(
            `Remover “${label}”? Essa ação não pode ser desfeita.`,
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className={className}>
        Remover
      </button>
    </form>
  );
}
