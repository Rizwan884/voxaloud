import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import StickyAdBanner from "@/components/StickyAdBanner";
import AppPromoBar from "@/components/AppPromoBar";
import { AuthProvider } from "@/components/auth/AuthProvider";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fishaudio.online"),
  title: "Fish Audio Online — Free AI Voice Cloning & Text to Speech",
  description: "Experience professional-grade AI text-to-speech conversion and instant 15-second voice cloning with complete commercial freedom. 500+ premium AI voices across 75+ languages.",
  icons: {
    icon: [
      { url: "/branding/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/branding/app-icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/branding/favicon.png",
    apple: "/branding/app-icon.png",
  },
  openGraph: {
    title: "Fish Audio Online — Free AI Voice Cloning & Text to Speech",
    description: "Experience professional-grade AI voice cloning and text-to-speech conversion with complete commercial freedom.",
    url: "https://fishaudio.online",
    siteName: "Fish Audio Online",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/branding/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fish Audio Online AI Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fish Audio Online — Free AI Voice Cloning & Text to Speech",
    description: "Experience professional-grade AI voice cloning and text-to-speech conversion with complete commercial freedom.",
    images: ["/branding/og-image.png"],
  },
  verification: {
    google: "yvA0g-7_KqR-J-L_XwV5Z_J_q8_r0_Q",
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
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col bg-canvas text-ink`}>
        <AuthProvider>
          <Schema />
          <ExitIntentPopup />
          <StickyAdBanner />
          <AppPromoBar />
          <Navbar />
          <div className="flex-1 flex flex-col pb-16 md:pb-24">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
