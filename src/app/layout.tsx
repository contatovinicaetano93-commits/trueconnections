import type { Metadata, Viewport } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "True Connection",
    template: `%s | True Connection`,
  },
  description: site.description,
  icons: {
    icon: site.mark,
    apple: site.mark,
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
        width: 1024,
        height: 1024,
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#EDE6DC",
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
      <body className="min-h-full bg-[hsl(38_28%_90%)] font-[family-name:var(--font-body)] text-[hsl(24_12%_12%)]">
        <a href="#topo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
