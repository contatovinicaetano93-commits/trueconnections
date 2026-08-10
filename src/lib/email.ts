import { Resend } from "resend";

function getFrom() {
  return (
    process.env.EMAIL_FROM?.trim() || "True Connection <onboarding@resend.dev>"
  );
}

function siteOrigin() {
  const authUrl = process.env.BETTER_AUTH_URL?.trim();
  if (authUrl) {
    return authUrl.replace(/\/api\/auth\/?$/, "").replace(/\/$/, "");
  }
  return "https://trueconnections.com.br";
}

async function sendEmail({
  to,
  subject,
  html,
  logLabel,
}: {
  to: string;
  subject: string;
  html: string;
  logLabel: string;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = getFrom();

  if (!apiKey) {
    console.info(`[auth] ${logLabel} (configure RESEND_API_KEY):`, {
      to,
      subject,
    });
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "RESEND_API_KEY não configurada — não é possível enviar e-mail.",
      );
    }
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ from, to, subject, html });
  if (error) {
    throw new Error(error.message);
  }
}

export async function sendPasswordResetEmail({
  to,
  name,
  url,
}: {
  to: string;
  name: string;
  url: string;
}) {
  await sendEmail({
    to,
    subject: "Redefinir senha — True Connections",
    logLabel: "Reset password link",
    html: `
      <div style="font-family: Georgia, serif; color: #221e1b; line-height: 1.6;">
        <p>Olá, ${name || "associado"}.</p>
        <p>Recebemos um pedido para redefinir a senha da sua conta True Connections.</p>
        <p>
          <a href="${url}" style="display:inline-block;padding:12px 20px;background:#b69554;color:#221e1b;text-decoration:none;border-radius:999px;font-weight:600;">
            Redefinir senha
          </a>
        </p>
        <p style="font-size: 14px; color: #5e5550;">
          Se você não pediu isso, ignore este e-mail. O link expira em 1 hora.
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeInviteEmail({
  to,
  name,
  email,
  temporaryPassword,
  setPasswordUrl,
}: {
  to: string;
  name: string;
  email: string;
  temporaryPassword: string;
  setPasswordUrl: string;
}) {
  const loginUrl = `${siteOrigin()}/associados/login`;

  await sendEmail({
    to,
    subject: "Seu acesso — True Connections",
    logLabel: "Welcome invite",
    html: `
      <div style="font-family: Georgia, serif; color: #221e1b; line-height: 1.65; max-width: 560px;">
        <p>Olá, <strong>${name || "associado"}</strong>.</p>
        <p>Seu acesso à área de associados True Connections foi criado.</p>
        <p style="margin: 24px 0; padding: 16px 18px; background: #f4efe8; border: 1px solid #cfc7bf;">
          <strong>E-mail (login):</strong> ${email}<br/>
          <strong>Senha inicial:</strong> ${temporaryPassword}
        </p>
        <p>Antes de entrar no painel, <strong>crie sua própria senha</strong> pelo botão abaixo:</p>
        <p>
          <a href="${setPasswordUrl}" style="display:inline-block;padding:12px 22px;background:#b69554;color:#221e1b;text-decoration:none;border-radius:999px;font-weight:600;">
            Criar minha senha
          </a>
        </p>
        <p style="font-size: 14px; color: #5e5550;">
          O link é válido por 7 dias. Depois de criar a senha, entre em
          <a href="${loginUrl}" style="color:#b69554;">Área de membros</a>
          com seu e-mail e a nova senha.
        </p>
        <p style="font-size: 14px; color: #5e5550;">
          Se você não esperava este e-mail, fale com a equipe True Connections.
        </p>
      </div>
    `,
  });
}

export function buildSetPasswordUrl(token: string, email: string) {
  const authBase = (
    process.env.BETTER_AUTH_URL?.trim() || `${siteOrigin()}/api/auth`
  ).replace(/\/$/, "");
  const callback = encodeURIComponent(
    `/associados/criar-senha?email=${encodeURIComponent(email)}`,
  );
  return `${authBase}/reset-password/${token}?callbackURL=${callback}`;
}
