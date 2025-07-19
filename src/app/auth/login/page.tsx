"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../../../public/login.png";
import buttonImage from "../../../../public/Group 1.png";
import { useToastContext } from "../../../contexts/ToastContext";
import { loginUser } from "./login";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showSuccess, showError } = useToastContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      loginUser(formData)
        .then((response) => {
          if (response.access_token) {
            localStorage.setItem("token", response.access_token);
            localStorage.setItem("user", JSON.stringify(response.user));
            showSuccess("Login realizado com sucesso!");
            router.push("/menu");
          } else {
            showError("Erro no login");
          }
        });
    } catch (error) {
      console.error("Erro no login:", error);
      let errorMessage = "Credenciais inválidas";
      if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response && error.response.data && typeof error.response.data === "object" && "message" in error.response.data) {
        errorMessage = (error.response as { data?: { message?: string } }).data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col !pt-20 items-center w-screen h-screen pb-20 bg-white gap-10">
      <div className="w-[59px] h-[57px] relative !mt-[-60px]">
        <Image
          src={logo}
          alt="Logo ECO ARAPIRACA"
          fill
          sizes="59px"
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
        <form className="flex flex-col gap-4 w-[340px]" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[20px] text-[#093A3E] font-bold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@ecoarapiraca.com"
              required
              className="w-full h-[47px] border-2 !bg-[#093A3E] !text-white !placeholder:text-blue-50 placeholder:font-bold border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <div>
            <label className="block text-[20px] text-[#093A3E] font-bold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="******"
              required
              minLength={6}
              className="w-full h-[47px] border-2 !bg-[#093A3E] !text-white !placeholder:text-blue-50 !placeholder:font-bold border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <button type="submit" disabled={isLoading} className="mt-6 self-center">
            <Image
              src={buttonImage}
              alt={isLoading ? "Entrando..." : "Acessar"}
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
