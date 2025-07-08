import { Inter, Roboto, Shrikhand } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import layout from "../../public/layout.png";

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
    <html lang="pt-BR">
      <div className="">
        <Image alt="layout" src={layout} className="w-[47px] h-[47px]" />
      </div>
      <body
        className={`${shrikhand.variable} ${robotoBlack.variable} ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
