import Image from "next/image";
import React from "react";
import logo from "../../../public/login.png";
import buttonImage from "../../../public/Group 1.png";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen pb-20 bg-white gap-10">
      <div className="w-[59px] h-[57px] relative !mt-[-60px]">
        <Image
          src={logo}
          alt="Logo ECO ARAPIRACA"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-5 !mt-[-20px]">
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
      <div className="flex flex-col items-center justify-center">
        <form className="flex flex-col gap-4 w-[340px]">
          <div>
            <label className="block text-[20px] text-[#093A3E] font-bold mb-1">
              Usuario
            </label>
            <input
              type="text"
              placeholder="ADMIN"
              className="w-full h-[47px] border-2 !bg-[#093A3E] !text-white !placeholder:text-blue-50 placeholder:font-bold border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <div>
            <label className="block text-[20px] text-[#093A3E] font-bold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="******"
              className="w-full h-[47px] border-2 !bg-[#093A3E] !text-white !placeholder:text-blue-50 !placeholder:font-bold border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <button type="submit" className="mt-6 self-center">
            <Image
              src={buttonImage}
              alt="Acessar"
              width={159}
              height={37}
              className="hover:opacity-90 transition-opacity"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
