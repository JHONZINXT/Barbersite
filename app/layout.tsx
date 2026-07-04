import type { Metadata } from "next";
import { Anton, Barlow, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Slick Style Barbershop",
  description: "Corte, barba e styling com hora marcada de verdade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${anton.variable} ${barlow.variable} ${jbMono.variable} font-body`}>
        <div className="brick-bg" />
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
