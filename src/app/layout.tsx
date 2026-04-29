import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import AdBlockDetector from "@/components/AdBlockDetector";

export const metadata: Metadata = {
  title: "VoxaLoud - Premium AI TTS",
  description: "Experience professional-grade text-to-speech conversion with complete commercial freedom. 500+ premium AI voices across 75+ languages.",
  openGraph: {
    title: "VoxaLoud - Premium AI TTS",
    description: "Experience professional-grade text-to-speech conversion with complete commercial freedom.",
    url: "https://voxaloud.shaaddev.studio",
    siteName: "VoxaLoud",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://raw.githubusercontent.com/Mob884/tsda/refs/heads/main/httpsvoxaloud.shaaddev.studio%20(1).png",
        width: 1200,
        height: 630,
        alt: "VoxaLoud Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoxaLoud - Premium AI TTS",
    description: "Experience professional-grade text-to-speech conversion with complete commercial freedom.",
    images: ["https://raw.githubusercontent.com/Mob884/tsda/refs/heads/main/httpsvoxaloud.shaaddev.studio%20(1).png"],
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
        {/* Adsterra Global Scripts */}
        <Script strategy="afterInteractive" src="https://pl29281938.profitablecpmratenetwork.com/b5/ff/e7/b5ffe7bcaf166b0ceda400a483f6faee.js" />
        <Script strategy="afterInteractive" src="https://pl29281940.profitablecpmratenetwork.com/2b/5a/3d/2b5a3d0917dee1aad0160264f728f686.js" />
      </body>
    </html>
  );
}
