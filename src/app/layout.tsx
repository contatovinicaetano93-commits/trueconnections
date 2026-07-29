import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const body = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "True Connection",
    template: "%s | True Connection",
  },
  description:
    "Comunidade cristã editorial para conectar, crescer e prosperar através de experiências curadas, fé e networking com propósito.",
  openGraph: {
    title: "True Connection",
    description:
      "Mais do que uma plataforma. Um movimento. Comunidade cristã para conexões verdadeiras.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-parchment">
        <div className="grain" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
