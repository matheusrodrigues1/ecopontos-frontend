"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface EcoPoint {
  id: string;
  title: string;
  cnpj: string;
  opening_hours: string;
  interval: string;
  accepted_materials: string[];
  address: string;
  coordinates: string;
}

const Editar = () => {
  const [ecopoint, setEcopoint] = useState<EcoPoint | null>(null);
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
  const router = useRouter();

  useEffect(() => {
    const storedEcopoint = localStorage.getItem('editingEcopoint');
    if (storedEcopoint) {
      const ecopointData = JSON.parse(storedEcopoint);
      setEcopoint(ecopointData);
      setFormData({
        title: ecopointData.title,
        cnpj: ecopointData.cnpj,
        opening_hours: ecopointData.opening_hours,
        interval: ecopointData.interval,
        accepted_materials: ecopointData.accepted_materials.join(", "),
        address: ecopointData.address,
        coordinates: ecopointData.coordinates
      });
    } else {
      router.push('/ecopoints/listar');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ecopoint) return;

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

      const response = await axios.patch(`http://localhost:3001/ecopoints/${ecopoint.id}`, payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Ecoponto atualizado com sucesso:", response.data);
      alert("Ecoponto atualizado com sucesso!");

      localStorage.removeItem('editingEcopoint');
      router.push('/listar');

    } catch (error) {
      console.error("Erro ao atualizar ecoponto:", error);

      if (error instanceof AxiosError && error.response?.status === 400) {
        alert("Erro de validação: " + (error.response?.data?.message || "Verifique os dados e tente novamente."));
      } else {
        alert("Erro ao atualizar ecoponto. Verifique os dados e tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem('editingEcopoint');
    router.push('/ecopoints/listar');
  };

  if (!ecopoint) {
    return (
      <div className="flex flex-col items-center w-screen h-screen gap-10 bg-white justify-center">
        <span className="font-bold text-2xl text-black">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-screen h-screen gap-10 bg-white">
      <div className="flex items-center gap-4 mt-8">
        <div style={{ paddingTop: '8px' }}>
          <button
            onClick={() => router.push("/ecopoints/listar")}
            className="transition-colors"
            style={{
              backgroundColor: '#093A3E',
              color: 'white',
              padding: '8px 16px',
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
        </div>
        <span className="font-bold text-2xl text-black">Editar: {ecopoint.title}</span>
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
              placeholder="12.345.678/0001-90"
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
          <div className="flex gap-3 mt-6" style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                padding: '15px',
                border: '3px solid #b91c1c',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s, border-color 0.2s',
              }}
              className="flex-1 h-[60px]"
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.borderColor = '#991b1b';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.borderColor = '#b91c1c';
              }}
            >
              CANCELAR
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: '#16a34a',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                padding: '15px',
                border: '3px solid #15803d',
                borderRadius: '8px',
                cursor: 'pointer',
                opacity: isLoading ? 0.5 : 1,
                transition: 'background-color 0.2s, border-color 0.2s',
              }}
              className="flex-1 h-[60px]"
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#22c55e';
                e.currentTarget.style.borderColor = '#166534';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#16a34a';
                e.currentTarget.style.borderColor = '#15803d';
              }}
            >
              {isLoading ? "SALVANDO..." : "SALVAR"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editar;
