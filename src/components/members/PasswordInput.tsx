"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { memberAuthInputClass } from "@/components/members/memberStyles";

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
      <span className="text-sm font-medium text-[hsl(30_10%_25%)]">{label}</span>
      <div className="relative">
        <input
          name={name}
          type={visible ? "text" : "password"}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`${memberAuthInputClass} pr-12`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-[hsl(30_8%_45%)] transition hover:text-[hsl(30_10%_25%)]"
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
      <span className="text-sm font-medium text-[hsl(30_10%_25%)]">{label}</span>
      {children}
    </label>
  );
}

export { memberAuthInputClass as authInputClass };
