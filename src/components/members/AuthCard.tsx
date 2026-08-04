import Link from "next/link";

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
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 py-16">
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="mesh" aria-hidden />
      </div>
      <div className="relative w-full max-w-lg rounded-3xl border border-line bg-smoke/55 p-8 shadow-[0_20px_60px_rgba(34,30,27,0.08)] backdrop-blur-sm md:p-10">
        <Link
          href="/"
          className="eyebrow mb-3 inline-block text-gold transition hover:text-gold-soft"
        >
          True Connection
        </Link>
        <h1 className="display text-3xl text-parchment md:text-4xl">{title}</h1>
        <p className="mt-3 mb-8 text-sm leading-relaxed text-mute">
          {description}
        </p>
        {children}
        {footer ? <div className="mt-8 space-y-2 text-sm text-mute">{footer}</div> : null}
      </div>
    </div>
  );
}
