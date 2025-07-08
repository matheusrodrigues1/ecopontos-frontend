import { Inter, Roboto, Shrikhand } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import layout from "../../public/layout.png";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "ECO ARAPIRACA",
  description: "Sistema de administração ECO ARAPIRACA",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <div className="w-full !bg-white !absolute">
        <Image
          alt="layout"
          src={layout}
          className="w-[47px] h-[47px] !bg-white"
        />
      </div>
      <body
        className={`${shrikhand.variable} ${robotoBlack.variable} ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
