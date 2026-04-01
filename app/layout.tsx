import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://api-pearl-nine-29.vercel.app"),
  title: "GitReposAPI - API publica para repositorios GitHub",
  description:
    "Busque, filtre e ordene repositorios publicos de qualquer usuario do GitHub com uma unica chamada. Perfeita para portfolios, dashboards e projetos pessoais. Gratuita, com CORS e pronta para producao.",
  keywords: [
    "github api",
    "github repos",
    "portfolio api",
    "github repositories",
    "developer portfolio",
    "github stats",
    "open source",
    "api publica",
    "next.js api",
  ],
  authors: [{ name: "Erick Dias", url: "https://github.com/dev-erickydias" }],
  creator: "Erick Dias",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://api-pearl-nine-29.vercel.app",
    title: "GitReposAPI - API publica para repositorios GitHub",
    description:
      "Busque, filtre e ordene repositorios publicos de qualquer usuario do GitHub com uma unica chamada. Gratuita e pronta para producao.",
    siteName: "GitReposAPI",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitReposAPI - API publica para repositorios GitHub",
    description:
      "Busque, filtre e ordene repositorios publicos de qualquer usuario do GitHub. Gratuita, com CORS e pronta para producao.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#080b10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
