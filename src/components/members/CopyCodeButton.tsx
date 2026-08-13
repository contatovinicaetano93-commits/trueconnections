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
      <code className="rounded-xl border border-[hsl(40_40%_52%)]/35 bg-[hsl(40_40%_52%)]/12 px-4 py-2.5 font-mono text-sm tracking-[0.12em] text-[hsl(24_12%_12%)] uppercase">
        {code}
      </code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-xl border border-[hsl(32_14%_78%/0.45)] bg-white px-4 py-2.5 text-sm text-[hsl(24_12%_12%)] transition hover:border-[hsl(40_40%_52%)]/50 hover:text-[hsl(40_40%_52%)]"
      >
        {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
        <span className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase">
          {copied ? "Copiado" : "Copiar código"}
        </span>
      </button>
    </div>
  );
}
