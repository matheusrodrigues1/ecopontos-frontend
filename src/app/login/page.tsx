"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../../public/login.png";
import buttonImage from "../../../public/Group 1.png";
import { FormEvent } from "react";
import { useToastContext } from "../../contexts/ToastContext";
import { responseLogin } from "./login";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToastContext();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await responseLogin(email, password);

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        showSuccess('Login realizado com sucesso!');

        setTimeout(() => {
          router.push("/menu");
        }, 1000);
      } else {
        const error = await response.json();
        showError(error.message || 'Credenciais inválidas');
      }
    } catch (error) {
      showError('Erro ao conectar com o servidor');
      if (error instanceof Error) {
        console.error('Login error:', error.message);
      } else {
        console.error('Login error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col !pt-4 !px-4 items-center w-screen h-screen pb-20 bg-white gap-10">
      <div className="flex w-full items-center">
        <button
          onClick={() => router.push("/mapa")}
          className="transition-colors ml-2"
          style={{
            backgroundColor: '#093A3E',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '0',
            marginRight: '10'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0c4a4f';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#093A3E';
          }}
        >
          ← Voltar
        </button>
      </div>
      <div className="w-[59px] h-[57px] relative">
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
        <form className="flex flex-col gap-4 w-[340px]" onSubmit={handleLogin}>
          <div>
            <label className="block text-[20px] text-[#093A3E] font-bold mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@admin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[47px] border-2 !bg-[#093A3E] !text-white !placeholder:text-blue-50 !placeholder:font-bold border-[#093A3E] p-3 !rounded-lg !pl-3"
            />
          </div>
          <button type="submit" className="mt-6 self-center" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center w-[159px] h-[37px] bg-gray-400 rounded text-white">
                Carregando...
              </div>
            ) : (
              <Image
                src={buttonImage}
                alt="Acessar"
                width={159}
                height={37}
                className="hover:opacity-90 transition-opacity"
                style={{
                  cursor: 'pointer',
                }}
              />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
