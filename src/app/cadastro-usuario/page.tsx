"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToastContext } from "../../contexts/ToastContext";
import registerUser from "./register";
import styles from "./style.module.css";

const GerenciarUsuarios = () => {
  const [formData, setFormData] = useState({
    name: "",
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
      await registerUser(formData);
      showSuccess("Usuário criado com sucesso!");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      let errorMessage = "Erro ao criar usuário";
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      }
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>Criar Novo Usuário</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Digite o nome do usuário"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Digite o email do usuário"
          />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="Digite a senha (mínimo 6 caracteres)"
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar Usuário"}
          </button>

          <button
            type="button"
            className={styles.backButton}
            onClick={() => router.push("/mapa")}
          >
            ← Voltar mapa
          </button>
        </form>
      </div>
    </div>
  );
};

export default GerenciarUsuarios;
