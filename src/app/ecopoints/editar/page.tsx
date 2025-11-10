"use client";

import React, { useState, useEffect } from "react";
import ToastContainer from "@/app/components/ToastContainer";
import { useToast } from "@/app/hooks/useToast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { editarEcoponto } from "./editar";
// Importe um arquivo CSS global ou coloque este CSS no seu arquivo global (ex: globals.css)
import "./Editar.module.css"
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
  const { showToast, toasts, removeToast } = useToast();
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

      await editarEcoponto(ecopoint, payload);

      showToast("Ecoponto atualizado com sucesso! 🎉", "success");

      localStorage.removeItem('editingEcopoint');
      router.push('/ecopoints/listar');

    } catch (error) {
      console.error("Erro ao atualizar ecoponto:", error);

      if (error instanceof AxiosError && error.response?.status === 400) {
        showToast("Erro de validação: " + (error.response?.data?.message || "Verifique os dados e tente novamente."), "error");
      } else {
        showToast("Erro ao atualizar ecoponto. Verifique os dados e tente novamente. 😔", "error");
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
      <div className="loading-container">
        <span className="loading-text">Carregando...</span>
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="container">
        
        {/* Cabeçalho */}
        <div className="header">
          <div className="back-button-wrapper">
            <button
              onClick={() => router.push("/ecopoints/listar")}
              className="back-button transition-colors"
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
          <span className="header-title">
            Editar: {ecopoint.title}
          </span>
        </div>

        {/* Formulário */}
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="form">
            
            {/* Título */}
            <div>
              <label className="label">Título</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ecoponto Nome 1"
                className="input"
                required
              />
            </div>
            
            {/* Horário de funcionamento */}
            <div>
              <label className="label">Horário de funcionamento</label>
              <input
                type="text"
                name="opening_hours"
                value={formData.opening_hours}
                onChange={handleInputChange}
                placeholder="08:00 às 17:00"
                className="input"
                required
              />
            </div>

            {/* Intervalo */}
            <div>
              <label className="label">Intervalo</label>
              <input
                type="text"
                name="interval"
                value={formData.interval}
                onChange={handleInputChange}
                placeholder="Diário"
                className="input"
                required
              />
            </div>

            {/* CNPJ */}
            <div>
              <label className="label">CNPJ</label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                placeholder="12.345.678/0001-90"
                className="input"
                required
              />
            </div>
            
            {/* Materiais aceitos */}
            <div>
              <label className="label">Materiais aceitos</label>
              <input
                type="text"
                name="accepted_materials"
                value={formData.accepted_materials}
                onChange={handleInputChange}
                placeholder="papel, plástico, vidro, metal"
                className="input"
                required
              />
            </div>
            
            {/* Endereço */}
            <div>
              <label className="label">Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Rua Fulano de Tal, 14, Bairro Duro"
                className="input"
                required
              />
            </div>

            {/* Coordenadas */}
            <div>
              <label className="label">Coordenadas</label>
              <input
                type="text"
                name="coordinates"
                value={formData.coordinates}
                onChange={handleInputChange}
                placeholder="-9.7518,-36.6612"
                className="input"
                required
              />
            </div>
            
            {/* Botões de Ação */}
            <div className="action-buttons-container">
              
              {/* Botão Cancelar */}
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-button flex-1 button-transition"
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
              
              {/* Botão Salvar */}
              <button
                type="submit"
                disabled={isLoading}
                className={`save-button flex-1 button-transition ${isLoading ? 'disabled-button' : ''}`}
                onMouseEnter={e => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#22c55e';
                    e.currentTarget.style.borderColor = '#166534';
                  }
                }}
                onMouseLeave={e => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#16a34a';
                    e.currentTarget.style.borderColor = '#15803d';
                  }
                }}
              >
                {isLoading ? "SALVANDO..." : "SALVAR"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Editar;