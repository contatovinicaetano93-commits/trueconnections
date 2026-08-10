"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const input = document.createElement("textarea");
      input.value = code;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <code className="rounded-xl border border-gold/35 bg-gold/12 px-4 py-2.5 font-mono text-sm tracking-[0.12em] text-deep uppercase">
        {code}
      </code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/35 px-4 py-2.5 text-sm text-parchment transition hover:border-gold/50 hover:text-gold"
      >
        {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
        <span className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase">
          {copied ? "Copiado" : "Copiar código"}
        </span>
      </button>
    </div>
  );
}
