import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TanstackProvider } from "@/lib/tanstack";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LabaLaba Nusantara - Order",
  description: "Order tracking dan pembayaran",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
