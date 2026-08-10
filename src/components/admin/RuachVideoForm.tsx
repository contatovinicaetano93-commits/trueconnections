"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { saveVideo } from "@/app/actions/members";
import {
  Field,
  adminInputClass,
  adminPrimaryBtnClass,
} from "@/components/admin/ui";

type SourceMode = "upload" | "link" | "keep";

export type VideoFormValues = {
  id?: string;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnailUrl: string | null;
  sortOrder: number;
  published: boolean;
};

function defaultMode(initial?: VideoFormValues): SourceMode {
  if (!initial?.id) return "upload";
  if (
    initial.videoUrl.includes("youtube.com") ||
    initial.videoUrl.includes("youtu.be") ||
    initial.videoUrl.includes("vimeo.com")
  ) {
    return "link";
  }
  return "keep";
}

export function RuachVideoForm({
  initial,
  onSaved,
}: {
  initial?: VideoFormValues;
  onSaved?: () => void;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [mode, setMode] = useState<SourceMode>(() => defaultMode(initial));
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

    if (!title) {
      setError("Informe o título.");
      setBusy(false);
      return;
    }

    try {
      let videoUrl = String(data.get("videoUrl") || "").trim();

      if (mode === "keep") {
        videoUrl = initial?.videoUrl || "";
        if (!videoUrl) {
          setError("Vídeo atual não encontrado. Envie um novo arquivo ou link.");
          setBusy(false);
          return;
        }
      } else if (mode === "upload") {
        const fileInput = form.elements.namedItem("file") as HTMLInputElement;
        const file = fileInput?.files?.[0];
        if (!file) {
          setError("Selecione um arquivo de vídeo.");
          setBusy(false);
          return;
        }

        setStatus("Enviando vídeo… isso pode levar alguns minutos.");
        const blob = await upload(`ruach/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/ruach/upload",
          multipart: true,
          onUploadProgress: ({ percentage }) => {
            setStatus(`Enviando… ${Math.round(percentage)}%`);
          },
        });
        videoUrl = blob.url;
        setStatus("Salvando na biblioteca…");
      } else if (!videoUrl) {
        setError("Cole a URL do YouTube ou Vimeo.");
        setBusy(false);
        return;
      } else {
        setStatus("Salvando na biblioteca…");
      }

      const payload = new FormData();
      if (initial?.id) {
        payload.set("id", initial.id);
      }
      payload.set("title", title);
      payload.set("videoUrl", videoUrl);
      payload.set("description", String(data.get("description") || ""));
      payload.set("thumbnailUrl", String(data.get("thumbnailUrl") || ""));
      payload.set("sortOrder", String(data.get("sortOrder") || "0"));
      if (data.get("published") === "on") {
        payload.set("published", "on");
      }

      await saveVideo(payload);
      if (!isEdit) {
        form.reset();
      }
      setStatus(isEdit ? "Alterações salvas." : "Vídeo publicado.");
      onSaved?.();
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Falha no upload. Confira o token do Blob e tente de novo.",
      );
    } finally {
      setBusy(false);
    }
  }

  const modeOptions = (
    isEdit
      ? ([
          ["keep", "Manter vídeo atual"],
          ["upload", "Trocar por arquivo"],
          ["link", "Trocar por link"],
        ] as const)
      : ([
          ["upload", "Upload de arquivo"],
          ["link", "Link YouTube / Vimeo"],
        ] as const)
  );

  return (
    <form onSubmit={onSubmit} className="grid max-w-2xl gap-4">
      <div className="flex flex-wrap gap-2">
        {modeOptions.map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${
              mode === value
                ? "border-gold/50 bg-gold/15 text-gold"
                : "border-line text-mute hover:border-gold/30"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <Field label="Título">
        <input
          name="title"
          required
          defaultValue={initial?.title ?? ""}
          placeholder="Aula 01 — Introdução"
          className={adminInputClass}
        />
      </Field>

      {mode === "keep" && initial?.videoUrl ? (
        <div className="rounded-xl border border-line bg-ink/20 px-4 py-3 text-sm text-mute">
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-gold">
            Vídeo atual
          </p>
          <p className="mt-2 break-all">{initial.videoUrl}</p>
        </div>
      ) : null}

      {mode === "upload" ? (
        <Field
          label="Arquivo de vídeo"
          hint="MP4, WebM ou MOV · até 512 MB. O arquivo sobe direto para o armazenamento."
        >
          <input
            name="file"
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/x-m4v"
            required={mode === "upload"}
            className={`${adminInputClass} file:mr-4 file:rounded-full file:border-0 file:bg-gold/20 file:px-3 file:py-1.5 file:text-sm file:text-deep`}
          />
        </Field>
      ) : null}

      {mode === "link" ? (
        <Field
          label="URL do vídeo"
          hint="YouTube ou Vimeo — o player embute automaticamente."
        >
          <input
            name="videoUrl"
            defaultValue={
              isEdit &&
              (initial?.videoUrl.includes("youtube") ||
                initial?.videoUrl.includes("youtu.be") ||
                initial?.videoUrl.includes("vimeo"))
                ? initial.videoUrl
                : ""
            }
            placeholder="https://www.youtube.com/watch?v=…"
            className={adminInputClass}
          />
        </Field>
      ) : null}

      <Field label="Thumbnail (opcional)">
        <input
          name="thumbnailUrl"
          defaultValue={initial?.thumbnailUrl ?? ""}
          placeholder="https://…"
          className={adminInputClass}
        />
      </Field>
      <Field label="Descrição">
        <textarea
          name="description"
          rows={3}
          defaultValue={initial?.description ?? ""}
          placeholder="Resumo da aula para o associado"
          className={adminInputClass}
        />
      </Field>
      <Field label="Ordem" hint="Menor número aparece primeiro.">
        <input
          name="sortOrder"
          type="number"
          defaultValue={initial?.sortOrder ?? 0}
          className={adminInputClass}
        />
      </Field>
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
            : "Publicar vídeo"}
      </button>
    </form>
  );
}
