import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import AdBlockDetector from "@/components/AdBlockDetector";

export const metadata: Metadata = {
  title: "Fish Audio Online - Premium AI TTS",
  description: "Experience professional-grade text-to-speech conversion with complete commercial freedom. 500+ premium AI voices across 75+ languages.",
  icons: {
    icon: "/branding/favicon.png",
    shortcut: "/branding/favicon.png",
    apple: "/branding/favicon.png",
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
      <body>
        <AdBlockDetector />
        {children}
      </body>
    </html>
  );
}
