"use client";

import Link from "next/link";
import { KeyRound, LogIn, UserPlus } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { MotionProvider } from "@/components/motion/MotionProvider";

const authIcons = {
  login: LogIn,
  signup: UserPlus,
  password: KeyRound,
} as const;

export function AuthCard({
  title,
  description,
  icon,
  children,
  footer,
}: {
  title: string;
  description: string;
  icon?: keyof typeof authIcons;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const Icon = icon ? authIcons[icon] : null;

  return (
    <MotionProvider>
      <div className="relative flex min-h-screen items-center justify-center bg-[hsl(38_28%_90%)] px-5 py-16">
        <FadeIn className="relative w-full max-w-[26rem]" y={18}>
          <div className="rounded-[1.25rem] border border-[hsl(32_14%_78%/0.35)] bg-white px-7 py-9 shadow-[0_8px_32px_rgba(0,0,0,0.06)] md:px-9 md:py-10">
            {Icon ? (
              <div className="mb-6 flex justify-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(24_14%_14%)] text-[hsl(38_28%_92%)]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
              </div>
            ) : null}

            <h1 className="text-center font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.08] text-[hsl(24_12%_12%)]">
              {title}
            </h1>
            <p className="mx-auto mt-3 mb-8 max-w-sm text-center text-[0.95rem] leading-relaxed text-[hsl(24_8%_34%)]">
              {description}
            </p>

            {children}

            {footer ? (
              <div className="mt-8 space-y-2.5 border-t border-[hsl(32_14%_78%/0.3)] pt-6 text-center text-sm text-[hsl(24_8%_34%)]">
                {footer}
              </div>
            ) : null}
          </div>

          <p className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-[hsl(24_8%_34%)] transition hover:text-[hsl(40_40%_52%)]"
            >
              Voltar ao site
            </Link>
          </p>
        </FadeIn>
      </div>
    </MotionProvider>
  );
}
