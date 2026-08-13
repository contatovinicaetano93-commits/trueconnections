"use client";

import { useState } from "react";
import { syncBase44ContentAction } from "@/app/actions/base44-sync";

export function SyncBase44Button() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSync() {
    setLoading(true);
    setMessage(null);
    setError(null);

    const response = await syncBase44ContentAction();
    setLoading(false);

    if (!response.ok) {
      setError(response.error);
      return;
    }

    const { coupons, studies, ruachVideos } = response.result;
    setMessage(
      `Sincronizado: ${coupons.created + coupons.updated} cupons, ${studies.created + studies.updated} estudos` +
        (ruachVideos.total > 0
          ? `, ${ruachVideos.created + ruachVideos.updated} vídeos Ruach`
          : ""),
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleSync}
        disabled={loading}
        className="inline-flex items-center rounded-full border border-gold/45 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition hover:border-gold/70 disabled:opacity-60"
      >
        {loading ? "Sincronizando…" : "Sincronizar conteúdo do Base44"}
      </button>
      {message ? (
        <p className="text-sm text-parchment/85" role="status">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-ember" role="alert">
          {error}
        </p>
      ) : null}
      <p className="max-w-xl text-xs leading-relaxed text-mute">
        Importa cupons (PartnerBrand) e estudos bíblicos (EstudoBiblico) publicados no Base44.
        Conteúdo existente com o mesmo parceiro ou slug é atualizado, não duplicado.
      </p>
    </div>
  );
}
