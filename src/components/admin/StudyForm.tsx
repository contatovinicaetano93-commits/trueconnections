"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { saveStudy } from "@/app/actions/members";
import {
  Field,
  adminInputClass,
  adminPrimaryBtnClass,
} from "@/components/admin/ui";

export type StudyFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  audioUrl: string | null;
  published: boolean;
};

export function StudyForm({
  initial,
  onSaved,
}: {
  initial?: StudyFormValues;
  onSaved?: () => void;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setStatus(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") || "").trim();
    const body = String(data.get("body") || "").trim();

    if (!title || !body) {
      setError("Informe título e texto do estudo.");
      setBusy(false);
      return;
    }

    try {
      let audioUrl = "";
      const fileInput = form.elements.namedItem("audio") as HTMLInputElement;
      const file = fileInput?.files?.[0];

      if (file) {
        setStatus("Enviando áudio…");
        const blob = await upload(`estudos/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/estudos/upload",
          multipart: true,
          onUploadProgress: ({ percentage }) => {
            setStatus(`Enviando áudio… ${Math.round(percentage)}%`);
          },
        });
        audioUrl = blob.url;
        setStatus("Salvando estudo…");
      } else {
        setStatus("Salvando estudo…");
      }

      const payload = new FormData();
      if (initial?.id) {
        payload.set("id", initial.id);
      }
      payload.set("title", title);
      payload.set("slug", String(data.get("slug") || ""));
      payload.set("excerpt", String(data.get("excerpt") || ""));
      payload.set("body", body);
      if (audioUrl) {
        payload.set("audioUrl", audioUrl);
      }
      if (data.get("removeAudio") === "on") {
        payload.set("removeAudio", "on");
      }
      if (data.get("published") === "on") {
        payload.set("published", "on");
      }

      await saveStudy(payload);

      if (!isEdit) {
        form.reset();
      }
      setStatus(isEdit ? "Alterações salvas." : "Estudo publicado.");
      onSaved?.();
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Falha ao salvar. Confira o arquivo e tente de novo.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-3xl gap-4">
      <Field label="Título">
        <input
          name="title"
          required
          defaultValue={initial?.title ?? ""}
          placeholder="Fé que conecta"
          className={adminInputClass}
        />
      </Field>
      <Field label="Slug" hint="Opcional. Ex.: fe-que-conecta">
        <input
          name="slug"
          defaultValue={initial?.slug ?? ""}
          placeholder="gerado automaticamente"
          className={adminInputClass}
        />
      </Field>
      <Field label="Resumo">
        <input
          name="excerpt"
          defaultValue={initial?.excerpt ?? ""}
          placeholder="Uma linha que aparece na listagem"
          className={adminInputClass}
        />
      </Field>
      <Field label="Texto completo">
        <textarea
          name="body"
          required
          rows={12}
          defaultValue={initial?.body ?? ""}
          placeholder="Escreva o estudo aqui…"
          className={adminInputClass}
        />
      </Field>
      <Field
        label={isEdit ? "Trocar áudio (opcional)" : "Áudio (opcional)"}
        hint="MP3, M4A, WAV ou OGG · até 100 MB. Deixe em branco para manter o áudio atual."
      >
        <input
          name="audio"
          type="file"
          accept="audio/mpeg,audio/mp3,audio/mp4,audio/x-m4a,audio/m4a,audio/wav,audio/ogg,audio/webm,audio/aac,.mp3,.m4a,.wav,.ogg"
          className={`${adminInputClass} file:mr-4 file:rounded-full file:border-0 file:bg-gold/20 file:px-3 file:py-1.5 file:text-sm file:text-deep`}
        />
      </Field>
      {initial?.audioUrl ? (
        <div className="space-y-3 rounded-xl border border-line bg-ink/20 px-4 py-3">
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-gold">
            Áudio atual
          </p>
          <audio
            controls
            preload="metadata"
            src={initial.audioUrl}
            className="w-full max-w-md"
          >
            Seu navegador não reproduz áudio.
          </audio>
          <label className="flex items-center gap-2 text-sm text-mute">
            <input name="removeAudio" type="checkbox" />
            Remover áudio ao salvar
          </label>
        </div>
      ) : null}
      <label className="flex items-center gap-2 text-sm text-mute">
        <input
          name="published"
          type="checkbox"
          defaultChecked={initial?.published ?? true}
        />
        Publicado para associados
      </label>

      {status ? <p className="text-sm text-gold">{status}</p> : null}
      {error ? <p className="text-sm text-ember">{error}</p> : null}

      <button
        type="submit"
        disabled={busy}
        className={`${adminPrimaryBtnClass} disabled:opacity-60`}
      >
        {busy
          ? "Processando…"
          : isEdit
            ? "Salvar alterações"
            : "Publicar estudo"}
      </button>
    </form>
  );
}
