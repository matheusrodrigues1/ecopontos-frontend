"use client";

import { Inter, Roboto, Shrikhand } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import layout from "../../public/layout.png";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <html lang="pt-BR">
      <div className="w-full !bg-white">
        <Image
          alt="Seta para voltar"
          src={layout}
          className="w-[47px] h-[47px] !bg-white cursor-pointer"
          onClick={handleGoBack}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleGoBack()}
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
