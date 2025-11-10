"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrar } from "./cadastrar";

import { useToastContext } from "@/contexts/ToastContext";

import { EcoPoint } from "@/app/types/ecopoints/ecopoints";
// Importa o módulo CSS
import styles from "./Cadastrar.module.css";

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
      {/* Container principal (Substitui as classes Tailwind) */}
      <div className={styles.container}>
        {/* Header Container (Substitui as classes Tailwind) */}
        <div className={styles.headerContainer}>
          <button
            onClick={() => router.back()}
            className={styles.backButton}
          >
            ← Voltar
          </button>
          {/* Título (Substitui as classes Tailwind) */}
          <span className={styles.headerTitle}>
            Cadastrar informações
          </span>
          {/* Div vazia para alinhar o título ao centro */}
          <div style={{ width: '72px' }}></div>
        </div>
        
        {/* Wrapper do Formulário (Substitui as classes Tailwind) */}
        <div className={styles.formWrapper}>
          {/* Formulário (Substitui as classes Tailwind) */}
          <form onSubmit={handleSubmit} className={styles.form}>
            
            {/* Título */}
            <div>
              <label className={styles.label}>
                Título
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ecoponto Nome 1"
                className={styles.inputField}
                required
              />
            </div>
            
            {/* Horário de funcionamento */}
            <div>
              <label className={styles.label}>
                Horário de funcionamento
              </label>
              <input
                type="text"
                name="opening_hours"
                value={formData.opening_hours}
                onChange={handleInputChange}
                placeholder="08:00 às 17:00"
                className={styles.inputField}
                required
              />
            </div>
            
            {/* Intervalo */}
            <div>
              <label className={styles.label}>
                Intervalo
              </label>
              <input
                type="text"
                name="interval"
                value={formData.interval}
                onChange={handleInputChange}
                placeholder="Diário"
                className={styles.inputField}
                required
              />
            </div>
            
            {/* CNPJ */}
            <div>
              <label className={styles.label}>
                CNPJ
              </label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                placeholder="12.345.678/0001-91"
                className={styles.inputField}
                required
              />
            </div>
            
            {/* Materiais aceitos */}
            <div>
              <label className={styles.label}>
                Materiais aceitos
              </label>
              <input
                type="text"
                name="accepted_materials"
                value={formData.accepted_materials}
                onChange={handleInputChange}
                placeholder="papel, plástico, vidro, metal"
                className={styles.inputField}
                required
              />
            </div>
            
            {/* Endereço */}
            <div>
              <label className={styles.label}>
                Endereço
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Rua Fulano de Tal, 14, Bairro Duro"
                className={styles.inputField}
                required
              />
            </div>
            
            {/* Coordenadas */}
            <div>
              <label className={styles.label}>
                Coordenadas
              </label>
              <input
                type="text"
                name="coordinates"
                value={formData.coordinates}
                onChange={handleInputChange}
                placeholder="-9.7518,-36.6612"
                className={styles.inputField}
                required
              />
            </div>
            
            {/* Botão de Cadastro */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
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