import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getMetadata } from "@/lib/metadata";
import { DeepgramContextProvider } from "@/context/DeepgramContextProvider";
import { MicrophoneContextProvider } from "@/context/MicrophoneContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "dark",
};

export const metadata: Metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MicrophoneContextProvider>
        <DeepgramContextProvider>
          <body className={inter.className}>{children}</body>
        </DeepgramContextProvider>
      </MicrophoneContextProvider>
    </html>
  );
}
