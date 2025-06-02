import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster} from 'sonner'

import {QueryClientContext} from '@/providers/query-client'
import {SessionProvider} from 'next-auth/react'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Prestigify - Conectando Criadores e Fãs com Recompensas Exclusivas",
  description:
    "Apoie seus criadores de conteúdo favoritos, desbloqueie recompensas exclusivas e ajude talentos a prosperar. Com Prestigify, apoiar nunca foi tão fácil — e recompensador.",
  keywords: [
    "apoio a criadores",
    "conteúdo exclusivo",
    "micro saas para creators",
    "fanbase",
    "monetização de conteúdo",
    "Prestigify",
    "criadores de conteúdo",
    "comunidade",
    "crowdfunding para creators",
  ],
  authors: [{ name: "Izileth Oryalith", url: "https://prestigify.com" }],
  creator: "Izileth Oryalith",
  metadataBase: new URL("https://prestigify.com"),
  icons: {
    icon: "https://i.pinimg.com/736x/a7/5c/35/a75c350a0c6f7a87f144ca1d6f52561c.jpg",
    shortcut: "https://i.pinimg.com/736x/a7/5c/35/a75c350a0c6f7a87f144ca1d6f52561c.jpg",
    apple: "https://i.pinimg.com/736x/a7/5c/35/a75c350a0c6f7a87f144ca1d6f52561c.jpg",
  },
  openGraph: {
    title: "Prestigify — Apoie Criadores. Receba Recompensas.",
    description:
      "Com Prestigify, você transforma apoio em experiência. Participe da comunidade dos seus creators favoritos e desbloqueie conteúdos e benefícios exclusivos.",
    url: "https://prestigify.com",
    siteName: "Prestigify",
    images: [
      {
        url: "/opengraph-image.png", // Idealmente uma imagem com branding visual forte
        width: 1200,
        height: 630,
        alt: "Banner Prestigify com criadores e fãs conectados",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prestigify — Apoie. Conecte. Recompense.",
    description:
      "Apoie quem inspira você e receba acesso a conteúdos, bônus e experiências únicas. Entre na nova era da valorização digital com Prestigify.",
    creator: "@prestigifyapp",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <QueryClientContext>
            {children}
            <Toaster duration={3000} />
          </QueryClientContext>
        </SessionProvider>
      </body>
    </html>
  );
}
