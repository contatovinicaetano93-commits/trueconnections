import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/lib/content";
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
  metadataBase: new URL(site.url),
  title: {
    default: "True Connection",
    template: "%s | True Connection",
  },
  description: site.description,
  icons: {
    icon: site.logo,
    apple: site.logo,
  },
  openGraph: {
    title: "True Connection",
    description: site.tagline,
    type: "website",
    url: site.url,
    siteName: "True Connection",
    images: [
      {
        url: site.logo,
        width: 1200,
        height: 630,
        alt: "True Connection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "True Connection",
    description: site.tagline,
    images: [site.logo],
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
        <a href="#topo" className="skip-link">
          Pular para o conteúdo
        </a>
        <div className="grain" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
