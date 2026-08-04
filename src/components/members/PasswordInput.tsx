"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const fieldClass =
  "w-full rounded-xl border border-line bg-card px-4 py-3 text-parchment outline-none ring-gold/40 focus:ring-2";

export function PasswordInput({
  name = "password",
  label = "Senha",
  autoComplete = "current-password",
  required = true,
  minLength = 8,
  placeholder,
}: {
  name?: string;
  label?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  placeholder?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.18em] text-mute">
        {label}
      </span>
      <div className="relative">
        <input
          name={name}
          type={visible ? "text" : "password"}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`${fieldClass} pr-12`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-mute transition hover:text-gold"
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );
}

export function AuthField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.18em] text-mute">
        {label}
      </span>
      {children}
    </label>
  );
}

export { fieldClass as authInputClass };
