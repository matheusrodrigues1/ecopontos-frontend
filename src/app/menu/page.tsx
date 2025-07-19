"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import logo from "../../../public/login.png";

const Menu = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center !pt-20 bg-white w-screen h-screen">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => router.push("/mapa")}
            className="transition-colors shadow-lg"
            style={{
              backgroundColor: '#2F4F4F',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              color: '#ffffff',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#374151';
              e.currentTarget.style.borderRadius = '8px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2F4F4F';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderRadius = '8px';
            }}
          >
            🏠 Home
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
            onClick={() => router.push("/ecopoints/cadastrar")}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '381px',
              height: '53px',
              backgroundColor: '#093A3E',
              borderRadius: '8px',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0c4a4f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#093A3E';
            }}
          >
            Cadastrar Ecoponto
          </button>
          <button
            onClick={() => router.push("/ecopoints/listar")}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '381px',
              height: '53px',
              backgroundColor: '#093A3E',
              borderRadius: '8px',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0c4a4f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#093A3E';
            }}
          >
            Listar Ecopontos
          </button>

          {user?.role === 'admin' && (
            <>
              <div className="w-full h-px bg-gray-300 my-4"></div>
              <p className="text-gray-600 font-medium mb-2">Área Administrativa</p>

              <button
                onClick={() => router.push("/gerenciar-usuarios")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '381px',
                  height: '53px',
                  backgroundColor: '#16a34a',
                  borderRadius: '8px',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#15803d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#16a34a';
                }}
              >
                Gerenciar Usuários
              </button>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Menu;
