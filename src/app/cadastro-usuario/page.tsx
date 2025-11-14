"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToastContext } from "../../contexts/ToastContext";
import registerUser from "./register";
import styles from "./style.module.css";
import Navbar from "../navbar/navbar";

const GerenciarUsuarios = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showSuccess, showError } = useToastContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
    <>
      <Navbar />
      <div
        className={styles.pageContainer}
      >
        <div className={styles.card}>
          <button className={styles.backButton} onClick={() => router.back()}>
            ← Voltar
          </button>
          <h1 className={styles.title}>Cadastrar Usuário</h1>
          <p className={styles.textInfo}>Exclusivo para usuarios comum</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GerenciarUsuarios;
