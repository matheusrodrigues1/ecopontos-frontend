"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../../public/login.png";

const Menu = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center !pt-20 bg-white w-screen h-screen">
      <div className="w-[59px] h-[57px] relative">
        <Image
          src={logo}
          alt="Logo ECO ARAPIRACA"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-5 !mt-5">
        <span className="text-[60px] text-[#093A3E] font-shrikhand leading-[22px] tracking-custom text-center">
          ECO
        </span>
        <span
          className="text-[60px] text-[#093A3E] font-roboto-black leading-[22px] tracking-[-0.04em] text-center"
          style={{
            fontVariationSettings: "'wght' 900",
          }}
        >
          ARAPIRACA
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 !mt-8">
        <button
          onClick={() => router.push("/cadastrar")}
          className="flex items-center justify-center w-[381px] h-[53px] !bg-[#093A3E] !rounded-lg !text-white hover:bg-[#0c4a4f] transition-colors"
        >
          Cadastrar
        </button>
        <button
          onClick={() => router.push("/editar")}
          className="flex items-center justify-center w-[381px] h-[53px] !bg-[#093A3E] !rounded-lg !text-white hover:bg-[#0c4a4f] transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => router.push("/excluir")}
          className="flex items-center justify-center w-[381px] h-[53px] !bg-[#093A3E] !rounded-lg !text-white hover:bg-[#0c4a4f] transition-colors"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Menu;
