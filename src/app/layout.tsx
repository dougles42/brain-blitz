import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "./components/NavBar";
import { OrganizationSchema } from "@/components/structured-data";
import { AdSenseLoader } from "@/components/ads/adsense-loader";
import { Equalizer } from "@/components/ui/Equalizer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://pitch-perfect.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a2e",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Pitch Perfect - Ear Training Game",
    template: "%s | Pitch Perfect",
  },
  description:
    "Train your musical ear with interactive pitch recognition exercises. Free online ear training game for musicians of all levels — improve relative pitch, identify notes by ear, and master musical fluency.",
  keywords: [
    "ear training",
    "pitch recognition",
    "interval recognition",
    "music theory game",
    "relative pitch training",
    "musical ear training",
    "online ear trainer",
    "learn intervals",
    "chord ear training",
    "music education",
    "aural skills",
    "free ear training",
    "interactive music game",
  ],
  authors: [{ name: "Pitch Perfect" }],
  creator: "Pitch Perfect",
  publisher: "Pitch Perfect",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
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
  openGraph: {
    type: "website",
    siteName: "Pitch Perfect",
    locale: "en_US",
    url: BASE_URL,
    title: "Pitch Perfect - Ear Training Game",
    description:
      "Train your musical ear with interactive pitch recognition exercises. Free online ear training game for musicians of all levels.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Pitch Perfect - Ear Training Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pitchperfect_app",
    creator: "@pitchperfect_app",
    title: "Pitch Perfect - Ear Training Game",
    description:
      "Train your musical ear with interactive pitch recognition exercises. Free online ear training game for musicians of all levels.",
    images: ["/api/og"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-1">
        <OrganizationSchema />
        <NavBar />
        {children}
        <Equalizer playing />
        <AdSenseLoader />
      </body>
    </html>
  );
}
