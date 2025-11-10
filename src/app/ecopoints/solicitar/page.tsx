"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { solicitarColeta } from "./solicitar";
import { useToastContext } from "@/contexts/ToastContext";
import styles from "./style.module.css";

const MATERIAIS = ["Papel", "Plástico", "Vidro", "Metal", "Eletrônicos", "Orgânico", "Outros"];

const SolicitarColeta = () => {
  const router = useRouter();
  const { showToast } = useToastContext();

  const [formData, setFormData] = useState({
    material: "",
    quantidade: 1,
    endereco: "",
    observacoes: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "quantidade" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await solicitarColeta(formData);
      showToast("Solicitação de coleta enviada com sucesso!", "success");
      setFormData({ material: "", quantidade: 1, endereco: "", observacoes: "" });
    } catch (error) {
      console.error("Erro ao solicitar coleta:", error);
      showToast("Erro ao enviar solicitação. Tente novamente.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <button className={styles.backButton} onClick={() => router.back()}>
          ← Voltar
        </button>

        <h2 className={styles.title}>Solicitar Coleta</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Material</label>
          <select
            name="material"
            value={formData.material}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Selecione um material</option>
            {MATERIAIS.map(mat => (
              <option key={mat} value={mat}>{mat}</option>
            ))}
          </select>

          <label>Quantidade (em kg)</label>
          <input
            type="number"
            name="quantidade"
            value={formData.quantidade}
            min={1}
            onChange={handleChange}
            placeholder="Ex: 5"
            required
          />

          <label>Endereço da coleta</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Rua das Flores, 123, Centro"
            required
          />

          <label>Observações</label>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            placeholder="Ex: portão azul, avisar ao chegar..."
            rows={3}
          />

          <button type="submit" disabled={isLoading} className={styles.submitButton}>
            {isLoading ? "Enviando..." : "Enviar Solicitação"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SolicitarColeta;
