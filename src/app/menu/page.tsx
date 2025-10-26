"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import logo from "../../../public/login.png";
import styles from "./style.module.css";

const Menu = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <button
          className={styles.homeButton}
          onClick={() => router.push("/mapa")}
        >
          🏠 Home
        </button>

        <div className={styles.logoWrapper}>
          <Image src={logo} alt="Logo ECO ARAPIRACA" fill sizes="59px" />
        </div>

        <div className={styles.title}>
          <span className={styles.titleEco}>ECO</span>
          <span className={styles.titleArapiraca}>ARAPIRACA</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-8">
          <button
            className={`${styles.button} ${styles.buttonEcopoints}`}
            onClick={() => router.push("/ecopoints/cadastrar")}
          >
            Cadastrar Ecoponto
          </button>
          <button
            className={`${styles.button} ${styles.buttonEcopoints}`}
            onClick={() => router.push("/ecopoints/listar")}
          >
            Listar Ecopontos
          </button>

          {user?.role === "admin" && (
            <>
              <div className={styles.divider}></div>
              <p className="text-gray-600 font-medium mb-2">Área Administrativa</p>

              <button
                className={`${styles.button} ${styles.buttonAdmin}`}
                onClick={() => router.push("/gerenciar-usuarios")}
              >
                Gerenciar Usuários
              </button>

              <button
                className={`${styles.button} ${styles.buttonAdmin}`}
                onClick={() => router.push("/cadastrar-empresa")}
              >
                Cadastrar empresa
              </button>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Menu;
