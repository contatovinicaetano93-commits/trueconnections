import { Resend } from "resend";

export async function sendPasswordResetEmail({
  to,
  name,
  url,
}: {
  to: string;
  name: string;
  url: string;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.EMAIL_FROM?.trim() || "True Connection <onboarding@resend.dev>";

  if (!apiKey) {
    console.info("[auth] Reset password link (configure RESEND_API_KEY):", {
      to,
      url,
    });
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "RESEND_API_KEY não configurada — não é possível enviar e-mail de recuperação.",
      );
    }
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: "Redefinir senha — True Connection",
    html: `
      <div style="font-family: Georgia, serif; color: #221e1b; line-height: 1.6;">
        <p>Olá, ${name || "associado"}.</p>
        <p>Recebemos um pedido para redefinir a senha da sua conta True Connection.</p>
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

  if (error) {
    throw new Error(error.message);
  }
}
