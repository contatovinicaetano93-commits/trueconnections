export type SubscriptionStatus =
  | "none"
  | "pending"
  | "active"
  | "overdue"
  | "paused";

export const DEFAULT_MEMBERSHIP_AMOUNT_CENTS = 0;
export const BILLING_CYCLE_DAYS = 30;
export const FREE_MEMBERSHIP = true;

export function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Digits only, with Brazil country code when missing. */
export function normalizeBrazilPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  // Country code 55 collides with DDD 55 (Goias). Only treat as international
  // when the number is already 12-13 digits (55 + DDD + local).
  if (digits.startsWith("55") && digits.length >= 12) return digits;
  if (digits.length >= 10 && digits.length <= 11) return `55${digits}`;
  return digits;
}

export function startOfUtcDay(date = new Date()) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

export function addDaysUtc(from: Date, days: number) {
  const base = startOfUtcDay(from);
  return new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
}

/** First due date: 30 days after registration. */
export function firstDueFromSignup(createdAt: Date) {
  return addDaysUtc(createdAt, BILLING_CYCLE_DAYS);
}

/** After payment: +30 days from the due date that was paid. */
export function nextDueAfterPayment(paidDueDate: Date) {
  return addDaysUtc(paidDueDate, BILLING_CYCLE_DAYS);
}

export function resolveSubscriptionStatus(input: {
  role: string;
  active: boolean;
  status: string | null;
  nextDueAt: Date | null;
  now?: Date;
}): SubscriptionStatus {
  if (input.role !== "member" || !input.active) return "none";
  const status = (input.status || "none") as SubscriptionStatus;
  if (status === "paused" || status === "none") return status;

  const now = startOfUtcDay(input.now ?? new Date());
  if (!input.nextDueAt) return "pending";

  const due = startOfUtcDay(input.nextDueAt);
  if (due > now) return "active";
  if (due.getTime() === now.getTime()) return "pending";
  return "overdue";
}

export function subscriptionLabel(status: SubscriptionStatus) {
  switch (status) {
    case "pending":
      return "Pagamento pendente";
    case "overdue":
      return "Em atraso";
    case "active":
      return "Em dia";
    case "paused":
      return "Pausada";
    case "none":
      return "Sem assinatura";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export function isBillingProfileComplete(input: {
  name: string;
  phone: string | null;
}) {
  return Boolean(input.name.trim() && normalizeBrazilPhone(input.phone || ""));
}

export function buildChargeWhatsAppUrl(input: {
  phone: string;
  name: string;
  amountCents: number;
  dueDate: Date | null;
}) {
  const phone = normalizeBrazilPhone(input.phone);
  if (!phone) return null;

  const amount = formatBRL(input.amountCents);
  const due = input.dueDate
    ? input.dueDate.toLocaleDateString("pt-BR", { timeZone: "UTC" })
    : "hoje";

  const text = [
    `Olá, ${input.name}! Aqui é a True Connections.`,
    `Sua mensalidade de ${amount} vence em ${due}.`,
    "Pode confirmar o pagamento por aqui? Obrigada!",
  ].join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
