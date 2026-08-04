export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[0.68rem] uppercase tracking-[0.16em] text-mute">
        {label}
      </span>
      {children}
      {hint ? <span className="block text-xs text-mute/80">{hint}</span> : null}
    </label>
  );
}

export const adminInputClass =
  "w-full rounded-xl border border-line bg-ink/35 px-4 py-3 text-parchment outline-none ring-gold/30 transition placeholder:text-mute/50 focus:border-gold/40 focus:ring-2";

export const adminPrimaryBtnClass =
  "inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-deep transition hover:bg-gold-soft";

export const adminGhostBtnClass =
  "text-sm text-mute transition hover:text-ember";

export function EmptyGuide({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-smoke/30 px-5 py-8 text-center">
      <p className="display text-xl text-parchment">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-mute">{body}</p>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="display mt-2 text-[clamp(1.9rem,3.5vw,2.8rem)] text-parchment">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-mute md:text-base">
          {description}
        </p>
      </div>
      {actions}
    </div>
  );
}
