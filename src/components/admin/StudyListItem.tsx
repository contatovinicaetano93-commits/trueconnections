"use client";

import { useState } from "react";
import { deleteStudy } from "@/app/actions/members";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import {
  StudyForm,
  type StudyFormValues,
} from "@/components/admin/StudyForm";
import { adminEditBtnClass } from "@/components/admin/ui";

export function StudyListItem({ study }: { study: StudyFormValues & { id: string } }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="rounded-2xl border border-line bg-ink/25 p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="display text-xl text-parchment">{study.title}</p>
          <p className="mt-1 text-sm text-mute">/{study.slug}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-mute">
            {study.published ? "Publicado" : "Rascunho"}
            {study.audioUrl ? " · Com áudio" : ""}
          </p>
          {study.audioUrl && !editing ? (
            <audio
              controls
              preload="metadata"
              src={study.audioUrl}
              className="mt-3 w-full max-w-md"
            >
              Seu navegador não reproduz áudio.
            </audio>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className={adminEditBtnClass}
            aria-expanded={editing}
          >
            {editing ? "Fechar" : "Editar"}
          </button>
          <ConfirmDeleteButton
            action={deleteStudy}
            id={study.id}
            label={study.title}
          />
        </div>
      </div>

      {editing ? (
        <div className="mt-5 border-t border-line pt-5">
          <p className="mb-4 text-[0.68rem] uppercase tracking-[0.16em] text-gold">
            Editar estudo
          </p>
          <StudyForm initial={study} onSaved={() => setEditing(false)} />
        </div>
      ) : null}
    </div>
  );
}
