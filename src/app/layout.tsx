import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { OrganizationSchema } from "@/components/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://brain-blitz.gg";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Brain Blitz — Free Browser Games",
    template: "%s — Brain Blitz",
  },
  description:
    "A collection of free browser games that test your brain. Pitch recognition, typography, geography, typing, and more. No signup, no downloads.",
  keywords: [
    "brain games",
    "free browser games",
    "pitch recognition",
    "ear training",
    "typography game",
    "geography game",
    "typing game",
    "logo quiz",
    "daily challenge",
    "multiplayer games",
    "no signup games",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: "Brain Blitz",
    locale: "en_US",
    url: BASE_URL,
    title: "Brain Blitz — Free Browser Games",
    description: "A collection of free browser games that test your brain. No signup, no downloads.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Brain Blitz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brain Blitz — Free Browser Games",
    description: "A collection of free browser games that test your brain. No signup, no downloads.",
    images: ["/api/og"],
  },
  alternates: { canonical: BASE_URL },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <OrganizationSchema />
        <header className="sticky top-0 z-50 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between h-12 px-4">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 hover:opacity-70 transition-opacity"
            >
              Brain Blitz
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/pitch"
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                Pitch
              </Link>
              <Link
                href="/font"
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                Font
              </Link>
              <Link
                href="/map"
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                Map
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-zinc-200/60 dark:border-zinc-800/60 mt-auto">
          <div className="max-w-4xl mx-auto flex items-center justify-between h-12 px-4">
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
              Brain Blitz
            </span>
            <div className="flex items-center gap-4 text-[11px]">
              <Link href="/faq" className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">FAQ</Link>
              <Link href="/leaderboard" className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Scores</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
