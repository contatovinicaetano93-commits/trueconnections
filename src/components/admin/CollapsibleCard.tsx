"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function CollapsibleCard({
  id,
  eyebrow,
  title,
  subtitle,
  summary,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Linha curta visível quando fechado */
  summary?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}) {
  const autoId = useId();
  const panelId = id ?? autoId;
  const uncontrolled = openProp === undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = uncontrolled ? internalOpen : openProp;

  function toggle() {
    const next = !isOpen;
    if (uncontrolled) setInternalOpen(next);
    onOpenChange?.(next);
  }

  return (
    <section
      className={`rounded-2xl border border-line bg-card/90 p-4 sm:p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="min-w-0 flex-1 text-left"
        >
          {eyebrow ? <p className="eyebrow text-gold">{eyebrow}</p> : null}
          <h2 className="display mt-1 text-2xl tracking-tight text-parchment sm:text-3xl">
            {title}
          </h2>
          {!isOpen && summary ? (
            <p className="mt-1 truncate text-sm text-mute">{summary}</p>
          ) : subtitle ? (
            <p className="mt-1 max-w-2xl text-sm text-mute">{subtitle}</p>
          ) : null}
        </button>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={isOpen ? `Fechar ${title}` : `Abrir ${title}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[0.65rem] uppercase tracking-wider text-mute transition hover:border-gold/40 hover:text-gold"
        >
          {isOpen ? (
            <>
              Fechar
              <ChevronUp size={14} />
            </>
          ) : (
            <>
              Abrir
              <ChevronDown size={14} />
            </>
          )}
        </button>
      </div>

      {isOpen ? (
        <div
          id={panelId}
          className="mt-5 animate-[admin-panel-in_280ms_ease-out]"
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}
