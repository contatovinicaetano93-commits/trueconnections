"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-5 py-16">
        <div className="pointer-events-none fixed inset-0" aria-hidden>
          <div className="mesh mesh--strong opacity-80" />
        </div>

        <FadeIn className="relative w-full max-w-[28rem]" y={18}>
          <div className="auth-panel relative rounded-[1.75rem] px-7 py-9 md:px-10 md:py-11">
            <Link
              href="/"
              className="mb-8 flex justify-center transition hover:opacity-90"
              aria-label="True Connections — voltar ao site"
            >
              <span className="inline-flex items-center justify-center md:rounded-2xl md:bg-[hsl(38_28%_94%/0.45)] md:px-8 md:py-5 md:ring-1 md:ring-black/[0.04]">
                <BrandLogo
                  variant="lockup"
                  size="xl"
                  priority
                  className="!h-16 !w-[14rem] md:!h-20 md:!w-[18rem]"
                />
              </span>
            </Link>

            <h1 className="display text-[clamp(1.9rem,4vw,2.65rem)] leading-[1.08] text-parchment">
              {title}
            </h1>
            <p className="mt-3 mb-8 max-w-md text-[0.95rem] leading-relaxed text-mute">
              {description}
            </p>

            {children}

            {footer ? (
              <div className="mt-9 space-y-2.5 border-t border-line pt-6 text-sm text-mute">
                {footer}
              </div>
            ) : null}
          </div>
        </FadeIn>
      </div>
    </MotionProvider>
  );
}
