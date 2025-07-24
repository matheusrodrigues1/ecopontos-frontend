"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrar } from "./cadastrar";

import { useToastContext } from "@/contexts/ToastContext";

import { EcoPoint } from "@/app/types/ecopoints/ecopoints";

const Cadastrar = () => {
  const router = useRouter();
  const { showToast } = useToastContext();
  const [formData, setFormData] = useState({
    title: "",
    cnpj: "",
    opening_hours: "",
    interval: "",
    accepted_materials: "",
    address: "",
    coordinates: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const materialsArray = formData.accepted_materials
        .split(",")
        .map(material => material.trim())
        .filter(material => material.length > 0);

      const payload = {
        title: formData.title,
        cnpj: formData.cnpj,
        opening_hours: formData.opening_hours,
        interval: formData.interval,
        accepted_materials: materialsArray,
        address: formData.address,
        coordinates: formData.coordinates
      };

      await cadastrar(payload as EcoPoint);

      showToast("Ecoponto cadastrado com sucesso!", "success");

      setFormData({
        title: "",
        cnpj: "",
        opening_hours: "",
        interval: "",
        accepted_materials: "",
        address: "",
        coordinates: ""
      });

    } catch (error) {
      console.error("Erro ao cadastrar ecoponto:", error);

      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { status?: number; data?: { message?: string } } };
        if (err.response?.status === 400) {
          showToast("Erro de validação: " + (err.response?.data?.message || "Verifique os dados e tente novamente."));
        } else {
          showToast("Erro ao cadastrar ecoponto. Verifique os dados e tente novamente.");
        }
      } else {
        showToast("Erro ao cadastrar ecoponto. Verifique os dados e tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-screen h-screen gap-10 bg-white">
        <div className="flex items-center justify-between w-full" style={{ paddingLeft: '10px', paddingRight: '16px', marginTop: '10px' }}>
          <button
            onClick={() => router.back()}
            className="transition-colors"
            style={{
              backgroundColor: '#093A3E',
              color: 'white',
              padding: '8px 8px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer'
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
          <span className="font-bold text-2xl text-black">
            Cadastrar informações
          </span>
          <div style={{ width: '72px' }}></div>
        </div>
        <div className="flex flex-col items-center justify-center mb-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[340px]">
            <div>
              <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
                Título
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ecoponto Nome 1"
                className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
                required
              />
            </div>
            <div>
              <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
                Horário de funcionamento
              </label>
              <input
                type="text"
                name="opening_hours"
                value={formData.opening_hours}
                onChange={handleInputChange}
                placeholder="08:00 às 17:00"
                className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
                required
              />
            </div>
            <div>
              <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
                Intervalo
              </label>
              <input
                type="text"
                name="interval"
                value={formData.interval}
                onChange={handleInputChange}
                placeholder="Diário"
                className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
                required
              />
            </div>
            <div>
              <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
                CNPJ
              </label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                placeholder="12.345.678/0001-91"
                className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
                required
              />
            </div>
            <div>
              <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
                Materiais aceitos
              </label>
              <input
                type="text"
                name="accepted_materials"
                value={formData.accepted_materials}
                onChange={handleInputChange}
                placeholder="papel, plástico, vidro, metal"
                className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
                required
              />
            </div>
            <div>
              <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
                Endereço
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Rua Fulano de Tal, 14, Bairro Duro"
                className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
                required
              />
            </div>
            <div>
              <label className="block text-[15px] text-[#093A3E] font-bold mb-1">
                Coordenadas
              </label>
              <input
                type="text"
                name="coordinates"
                value={formData.coordinates}
                onChange={handleInputChange}
                placeholder="-9.7518,-36.6612"
                className="w-full h-[40px] border-2 !bg-[#093A3E] !text-white !placeholder:text-[20px] border-[#093A3E] p-3 !rounded-lg !pl-3"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-9 self-center h-[40px] w-[200px] !bg-[#093A3E] hover:!bg-[#0c4a4f] !text-white !rounded-lg disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cadastrar;
