import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Telenova | Stream Together in Perfect Sync",
    template: "%s | Telenova",
  },
  description:
    "Watch movies and shows with friends in perfect sync. Private, buffer-free, and built for shared streaming experiences.",
  keywords: [
    "watch party",
    "sync streaming",
    "movie nights",
    "Telenova",
    "stream with friends",
  ],
  openGraph: {
    title: "Telenova | Stream Together in Perfect Sync",
    description: "Private, buffer-free streaming sync for friends and family",
    url: "https://telenova.app",
    siteName: "Telenova",
    images: [
      {
        // TODO: add og-image.jpg
        url: "https://telenova.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Telenova | Stream Together in Perfect Sync",
    description: "Private, buffer-free streaming sync for friends and family",
    creator: "@telenova",
    // TODO: add twitter-image.jpg
    images: ["https://telenova.app/twitter-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    // TODO: add apple-touch-icon.png
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://telenova.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
