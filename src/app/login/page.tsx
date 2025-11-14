"use client";
import Image from "next/image";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import logo from "../../../public/login.png";
import { useToastContext } from "../../contexts/ToastContext";
import { responseLogin } from "./login";
import styles from "./style.module.css";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToastContext();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await responseLogin(email, password);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        showSuccess("Login realizado com sucesso!");
        setTimeout(() => router.push("/menu"), 1000);
      } else {
        const error = await response.json();
        showError(error.message || "Credenciais inválidas");
      }
    } catch (error) {
      showError("Erro ao conectar com o servidor");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={() => router.push("/mapa")} className={styles.backButton}>
          ← Voltar
        </button>
      </div>

      <div className={styles.logoWrapper}>
        <Image src={logo} alt="Logo ECO ARAPIRACA" fill sizes="59px" className="object-contain" />
      </div>

      <div className={styles.titleContainer}>
        <span className={styles.titleECO}>ECO</span>
        <span className={styles.titleARAPIRACA}>ARAPIRACA</span>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleLogin}>
          <div>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              placeholder="admin@admin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.buttonRow}>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? (
                <div className={styles.loadingButton}>Carregando...</div>
              ) : (
                <p>Acessar</p>
              )}
            </button>

            <button className={styles.registerButton} onClick={() => router.push("/cadastro-usuario")}>Se cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
