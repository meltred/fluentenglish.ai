import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getMetadata } from "@/lib/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative w-full">
          <div className="absolute inset-0 bg-gradient from-color-blue-400 to-color-ping-300 opacity-25"></div>
          <div className="relative">{children}</div>
        </div>
      </body>
    </html>
  );
}
