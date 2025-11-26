"use client";
import { useState } from "react";
import styles from "./style.module.css";

export default function ReclamarForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarReclamacao = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/reclamacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem }),
      });

      const data = await res.json();
      alert(data.message);
      setNome("");
      setEmail("");
      setMensagem("");
    } catch (error) {
      alert("Erro ao enviar reclamação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Adicionei este container para controlar o fundo da página
    <div className={styles.container}>
      <form onSubmit={enviarReclamacao} className={styles.form}>
        <h2 className={styles.title}>Envie sua Reclamação</h2>
        <p className={styles.subtitle}>
          Sua opinião é importante para melhorarmos o serviço.
        </p>

        <div className={styles.field}>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Mensagem</label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
            rows={4}
          />
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Enviando..." : "Enviar Reclamação"}
        </button>
      </form>
    </div>
  );
}