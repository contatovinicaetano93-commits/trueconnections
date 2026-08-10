import Link from "next/link";
import { AuthCard } from "@/components/members/AuthCard";
import { site } from "@/lib/content";

export const metadata = {
  title: "Cadastro | Associados",
};

const steps = [
  {
    n: "01",
    title: "Fale com a equipe",
    body: "Peça seu acesso pelo WhatsApp. O cadastro público está fechado.",
  },
  {
    n: "02",
    title: "Receba e-mail e senha",
    body: "A administração cria sua conta e envia as credenciais.",
  },
  {
    n: "03",
    title: "Entre na área de membros",
    body: "Use o login para ver cupons, Ruach e estudos.",
  },
];

export default function CadastroPage() {
  return (
    <AuthCard
      title="Acesso por convite"
      description="A área de associados é exclusiva. Novas contas são criadas pela administração True Connections."
      footer={
        <>
          <p>
            Já tem conta?{" "}
            <Link href="/associados/login" className="font-medium text-gold hover:underline">
              Entrar
            </Link>
          </p>
          <p>
            <Link href="/" className="transition hover:text-gold">
              Voltar ao site
            </Link>
          </p>
        </>
      }
    >
      <ol className="space-y-4">
        {steps.map((step) => (
          <li
            key={step.n}
            className="flex gap-4 border border-line bg-ink/25 px-4 py-4"
          >
            <span className="display text-xl text-gold">{step.n}</span>
            <div>
              <p className="font-medium text-parchment">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-mute">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-deep transition hover:bg-gold-soft"
        >
          Pedir acesso no WhatsApp
        </a>
        <Link
          href="/associados/login"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-medium text-parchment transition hover:border-gold/50 hover:text-gold"
        >
          Já tenho acesso
        </Link>
      </div>
    </AuthCard>
  );
}
