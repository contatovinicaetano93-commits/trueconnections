"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#EDE7DE",
          color: "#221e1b",
          fontFamily: "Georgia, serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 12 }}>
            True Connection
          </p>
          <h1 style={{ fontWeight: 400, fontSize: "2rem" }}>Algo deu errado</h1>
          <p style={{ color: "#5e5550", maxWidth: 360, margin: "0.75rem auto 0" }}>
            Recarregue a página. Se continuar, fale com a administração.
          </p>
        </div>
      </body>
    </html>
  );
}
