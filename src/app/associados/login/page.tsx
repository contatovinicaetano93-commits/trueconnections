import { LoginForm } from "@/components/members/LoginForm";

export const metadata = {
  title: "Entrar | Associados",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-line bg-smoke/50 p-8 md:p-10">
        <p className="eyebrow mb-3">True Connection</p>
        <h1 className="display text-3xl text-parchment md:text-4xl">
          Área de associados
        </h1>
        <p className="mt-3 mb-8 text-sm text-mute">
          Acesse cupons de parceiros, aulas Ruach e estudos bíblicos.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
