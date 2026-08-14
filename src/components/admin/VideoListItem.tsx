"use client";

import { useState } from "react";
import { deleteVideo } from "@/app/actions/members";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import {
  RuachVideoForm,
  type VideoFormValues,
} from "@/components/admin/RuachVideoForm";
import { adminEditBtnClass } from "@/components/admin/ui";

export function VideoListItem({
  video,
  section,
}: {
  video: VideoFormValues & { id: string };
  section: "ruach" | "leme";
}) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="rounded-2xl border border-line bg-ink/25 p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="display text-xl text-parchment">{video.title}</p>
          <p className="mt-1 break-all text-sm text-mute">{video.videoUrl}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-mute">
            {video.published ? "Publicado" : "Rascunho"} · ordem {video.sortOrder}
            {video.duration ? ` · ${video.duration}` : ""}
          </p>
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
            action={deleteVideo}
            id={video.id}
            label={video.title}
          />
        </div>
      </div>

      {editing ? (
        <div className="mt-5 border-t border-line pt-5">
          <p className="mb-4 text-[0.68rem] uppercase tracking-[0.16em] text-gold">
            Editar vídeo
          </p>
          <RuachVideoForm
            initial={video}
            section={section}
            onSaved={() => setEditing(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
