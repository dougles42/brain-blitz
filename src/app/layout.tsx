import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { OrganizationSchema } from "@/components/structured-data";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://brain-blitz.gg";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "Brain Blitz", template: "%s — Brain Blitz" },
  description:
    "A collection of free browser games that test your brain. Pitch recognition, typography, geography, typing, and more. No signup, no downloads.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", siteName: "Brain Blitz", locale: "en_US", url: BASE_URL,
    title: "Brain Blitz — Free Browser Games",
    description: "Free browser games that test your brain. No signup, no downloads.",
  },
  twitter: { card: "summary_large_image", title: "Brain Blitz", description: "Free browser games that test your brain." },
  alternates: { canonical: BASE_URL },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-white antialiased">
        <OrganizationSchema />

        {/* Header */}
        <header className="relative z-50 border-b border-white/[0.06]">
          <div className="max-w-3xl mx-auto flex items-center justify-between h-12 px-4">
            <Link href="/" className="text-sm font-semibold tracking-tight text-white/80 hover:text-white transition-colors">
              Brain Blitz
            </Link>
            <nav className="flex items-center gap-5">
              <Link href="/pitch" className="text-[13px] text-white/35 hover:text-white/70 transition-colors">Pitch</Link>
              <Link href="/font" className="text-[13px] text-white/35 hover:text-white/70 transition-colors">Font</Link>
              <Link href="/map" className="text-[13px] text-white/35 hover:text-white/70 transition-colors">Map</Link>
              <Link href="/faq" className="text-[13px] text-white/35 hover:text-white/70 transition-colors">FAQ</Link>
            </nav>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="border-t border-white/[0.06] mt-auto">
          <div className="max-w-3xl mx-auto flex items-center justify-between h-12 px-4">
            <span className="text-[11px] text-white/20">Brain Blitz</span>
            <div className="flex items-center gap-5 text-[11px]">
              <Link href="/faq" className="text-white/20 hover:text-white/40 transition-colors">FAQ</Link>
              <Link href="/pitch/leaderboard" className="text-white/20 hover:text-white/40 transition-colors">Scores</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
