import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AKR WORLD | Global E-Commerce Marketplace",
  description:
    "Universal e-commerce marketplace featuring premier tech, designer fashion, smart home living, and flash vault deals with express worldwide delivery.",
  keywords: [
    "e-commerce",
    "global marketplace",
    "fashion",
    "electronics",
    "flash deals",
    "smart devices",
    "worldwide shipping",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F8F6F1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F6F1] text-zinc-900 selection:bg-zinc-900 selection:text-white">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
