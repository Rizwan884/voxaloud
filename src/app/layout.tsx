import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import AdBlockDetector from "@/components/AdBlockDetector";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700", "800"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Fish Audio Online - Premium AI TTS",
  description: "Experience professional-grade text-to-speech conversion with complete commercial freedom. 500+ premium AI voices across 75+ languages.",
  icons: {
    icon: "/branding/app-icon.png",
    shortcut: "/branding/app-icon.png",
    apple: "/branding/app-icon.png",
  },
  openGraph: {
    title: "Fish Audio Online - Premium AI TTS",
    description: "Experience professional-grade text-to-speech conversion with complete commercial freedom.",
    url: "https://fishaudio.online",
    siteName: "Fish Audio Online",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/branding/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fish Audio Online Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fish Audio Online - Premium AI TTS",
    description: "Experience professional-grade text-to-speech conversion with complete commercial freedom.",
    images: ["/branding/og-image.png"],
  },
  verification: {
    google: "AF0rsqXRbBlfo1k4uxTHEIkPfOD4IJM_GS9sNtgXXFM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/dheereshag/coloured-icons@master/app/ci.min.css"
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <Schema />
        <AdBlockDetector />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

// Build Trigger: 2026-05-11 14:19:30
