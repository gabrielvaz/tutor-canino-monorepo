import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tutorcanino.com.br'),
  title: "TutorCanino - Guia Completo sobre Raças e Cuidados",
  description: "Descubra tudo sobre o universo canino: raças, temperamento, saúde, cuidados e o cão ideal para o seu estilo de vida.",
  keywords: ["cachorro", "cão", "raças de cães", "cuidados com cachorro", "tutor canino"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-primary-light selection:text-gray-900 font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
// Force rebuild 1775406807
