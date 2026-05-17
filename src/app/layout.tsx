import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { ConceptProvider } from "@/components/ui/ConceptProvider";

const display = Geist({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#06090f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Casino Mathematics — Научная энциклопедия азартных игр и iGaming",
    template: "%s · Casino Mathematics",
  },
  description:
    "Строго научное руководство по математике казино, слотов, live-игр, sportsbook и iGaming. House edge, RTP, вариация, RNG, Kelly criterion, provably fair и многое другое.",
  applicationName: "Casino Mathematics",
  authors: [{ name: "Casino Mathematics" }],
  keywords: [
    "casino mathematics",
    "house edge",
    "RTP",
    "variance",
    "iGaming",
    "provably fair",
    "Kelly criterion",
    "RNG",
    "roulette",
    "blackjack",
    "sportsbook",
  ],
  openGraph: {
    title: "Casino Mathematics",
    description:
      "Премиальная научная энциклопедия математики азартных игр и iGaming.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ConceptProvider>
          <AppShell>{children}</AppShell>
        </ConceptProvider>
        <div className="noise fixed inset-0 z-[100] pointer-events-none" aria-hidden />
      </body>
    </html>
  );
}
