"use client";

import { useState } from "react";
import Image from "next/image";
import { Package, X } from "lucide-react";
import { loja } from "@/lib/content";

type Product = (typeof loja.products)[number];

function ProductDetail({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"form" | "pix">("form");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)]">
      <div className="relative aspect-square overflow-hidden bg-[hsl(38_20%_91%/0.25)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 480px"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[hsl(24_12%_12%)]">
              {product.name}
            </h2>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[hsl(24_14%_14%)]">
              {product.price}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(38_20%_91%/0.25)] transition-colors hover:bg-[hsl(38_20%_91%/0.5)]"
            aria-label="Fechar"
          >
            <X className="h-4 w-4 text-[hsl(24_8%_34%)]" />
          </button>
        </div>
        <p className="mb-5 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]">
          {product.description}
        </p>

        {step === "form" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!nome.trim()) return;
              setStep("pix");
            }}
            className="space-y-3"
          >
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              required
              className="w-full rounded-xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] px-4 py-3 font-[family-name:var(--font-body)] text-sm text-[hsl(24_12%_12%)] placeholder:text-[hsl(24_8%_34%)]/50 focus:border-[hsl(24_14%_14%)]/20 focus:ring-1 focus:ring-[hsl(24_14%_14%)]/10 focus:outline-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail (opcional)"
              className="w-full rounded-xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] px-4 py-3 font-[family-name:var(--font-body)] text-sm text-[hsl(24_12%_12%)] placeholder:text-[hsl(24_8%_34%)]/50 focus:border-[hsl(24_14%_14%)]/20 focus:ring-1 focus:ring-[hsl(24_14%_14%)]/10 focus:outline-none"
            />
            <button
              type="submit"
              className="cta-primary"
            >
              Quero este produto
            </button>
          </form>
        ) : (
          <div className="rounded-xl bg-[hsl(38_20%_91%/0.25)] p-4 text-center">
            <p className="mb-2 font-[family-name:var(--font-body)] text-sm text-[hsl(24_12%_12%)]">
              Envie o PIX para
            </p>
            <p className="mb-3 break-all font-mono text-sm text-[hsl(24_12%_12%)]">
              {loja.pixEmail}
            </p>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(loja.pixEmail);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 2000);
                } catch {
                  /* ignore */
                }
              }}
              className="font-[family-name:var(--font-body)] text-xs font-medium text-[hsl(24_14%_14%)]"
            >
              {copied ? "Copiado!" : "Copiar chave PIX"}
            </button>
            <p className="mt-3 font-[family-name:var(--font-body)] text-[10px] text-[hsl(24_8%_34%)]">
              Após o pagamento, envie o comprovante para o mesmo e-mail com seu
              nome ({nome.trim()}).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Loja() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-[hsl(24_12%_12%)]">
          {loja.title}
        </h1>
        <p className="font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
          {loja.subtitle}
        </p>
        <p className="mt-3 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]/70">
          {loja.body}
        </p>
      </div>

      {selected ? (
        <ProductDetail product={selected} onClose={() => setSelected(null)} />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {loja.products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setSelected(product)}
              className="overflow-hidden rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] text-left transition-all duration-500 hover:border-[hsl(40_40%_52%)]/15 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="relative aspect-square overflow-hidden bg-[hsl(38_20%_91%/0.25)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 240px"
                />
              </div>
              <div className="p-3">
                <p className="mb-1 line-clamp-2 font-[family-name:var(--font-body)] text-xs font-medium text-[hsl(24_12%_12%)]">
                  {product.name}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-display)] text-sm text-[hsl(24_14%_14%)]">
                    {product.price}
                  </span>
                  <span className="flex items-center gap-1 font-[family-name:var(--font-body)] text-[10px] text-[hsl(24_8%_34%)]">
                    <Package className="h-3 w-3" />
                    {product.stock} un.
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
