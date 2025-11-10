import React from "react";
import trashIcon from "@/../public/lixeira.png";
import Image from "next/image";
import styles from "./Delete.module.css";

const Deletar = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        Excluir Ecopontos
      </span>
      <div className={styles.listContainer}>
        {/* Bloco de Ecoponto 1 */}
        <span className={styles.ecopointItem}>
          Ecopontos Nome 1
          <Image
            src={trashIcon}
            alt="Lixeira"
            width={20}
            height={20}
            className={styles.trashIcon}
          />
        </span>
        {/* Bloco de Ecoponto 2 */}
        <span className={styles.ecopointItem}>
          Ecopontos Nome 1
          <Image
            src={trashIcon}
            alt="Lixeira"
            width={20}
            height={20}
            className={styles.trashIcon}
          />
        </span>
        {/* Bloco de Ecoponto 3 */}
        <span className={styles.ecopointItem}>
          Ecopontos Nome 1
          <Image
            src={trashIcon}
            alt="Lixeira"
            width={20}
            height={20}
            className={styles.trashIcon}
          />
        </span>
      </div>
      <button className={styles.concludeButton}>
        Concluir
      </button>
    </div>
  );
};

export default Deletar;