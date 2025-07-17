"use client";

import { Inter, Roboto, Shrikhand } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "../contexts/ToastContext";
import NoSSR from "../components/NoSSR";

const inter = Inter({ subsets: ["latin"] });

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shrikhand",
});

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
  variable: "--font-roboto-black",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${shrikhand.variable} ${robotoBlack.variable} ${inter.className}`}
        suppressHydrationWarning
      >
        <ToastProvider>
          <NoSSR>
            {children}
          </NoSSR>
        </ToastProvider>
      </body>
    </html>
  );
}