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
      </body>
    </html>
  );
}
