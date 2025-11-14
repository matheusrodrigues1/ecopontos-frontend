"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrar } from "./cadastrar";
import { useToastContext } from "@/contexts/ToastContext";
import { EcoPoint } from "@/app/types/ecopoints/ecopoints";
import styles from "./style.module.css";
import Navbar from "@/app/navbar/navbar";

const MATERIALS = ["Papel", "Plástico", "Vidro", "Metal", "Eletrônicos", "Outros"];

const Cadastrar = () => {
  const router = useRouter();
  const { showToast } = useToastContext();
  const [formData, setFormData] = useState({
    title: "",
    cnpj: "",
    opening_hours: "",
    interval: "",
    accepted_materials: [] as string[],
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

  const handleMaterialChange = (material: string) => {
    setFormData(prev => {
      const exists = prev.accepted_materials.includes(material);
      return {
        ...prev,
        accepted_materials: exists
          ? prev.accepted_materials.filter(m => m !== material)
          : [...prev.accepted_materials, material]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await cadastrar(formData as EcoPoint);
      showToast("Ecoponto cadastrado com sucesso!", "success");

      setFormData({
        title: "",
        cnpj: "",
        opening_hours: "",
        interval: "",
        accepted_materials: [],
        address: "",
        coordinates: ""
      });
    } catch (error) {
      console.error("Erro ao cadastrar ecoponto:", error);
      showToast("Erro ao cadastrar ecoponto. Verifique os dados e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.card}>
          <button className={styles.backButton} onClick={() => router.back()}>
            ← Voltar
          </button>
          <h2 className={styles.title}>Cadastrar Ecoponto</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ecoponto Nome 1"
              required
            />

            <label>Horário de funcionamento</label>
            <input
              type="text"
              name="opening_hours"
              value={formData.opening_hours}
              onChange={handleInputChange}
              placeholder="08:00 às 17:00"
              required
            />

            <label>Intervalo</label>
            <input
              type="text"
              name="interval"
              value={formData.interval}
              onChange={handleInputChange}
              placeholder="Diário"
              required
            />

            <label>CNPJ</label>
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
              placeholder="12.345.678/0001-91"
              required
            />

            <label>Materiais aceitos</label>
            <div className={styles.checkboxContainer}>
              {MATERIALS.map(material => (
                <label key={material} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.accepted_materials.includes(material)}
                    onChange={() => handleMaterialChange(material)}
                  />
                  {material}
                </label>
              ))}
            </div>

            <label>Endereço</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Rua Fulano de Tal, 14, Bairro Duro"
              required
            />

            <label>Coordenadas</label>
            <input
              type="text"
              name="coordinates"
              value={formData.coordinates}
              onChange={handleInputChange}
              placeholder="-9.7518,-36.6612"
              required
            />

            <button type="submit" disabled={isLoading} className={styles.submitButton}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cadastrar;
