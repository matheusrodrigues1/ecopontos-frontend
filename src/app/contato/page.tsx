"use client";

import React from 'react';
import styles from './style.module.css';

const ContatoPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.mainTitle}>Contatos</h1>
                    <p className={styles.subTitle}>
                        Canais oficiais de atendimento da Prefeitura de Arapiraca
                    </p>
                </header>

                <div className={styles.contentGrid}>
                    <div className={styles.infoCard}>
                        <h3 className={styles.infoCardTitle}>Prefeitura de Arapiraca</h3>
                        <ul className={styles.contactList}>
                            <li>
                                <strong>WhatsApp:</strong> (82) 99991-1941 / (82) 99991-4438
                            </li>
                        </ul>
                    </div>

                    <div className={styles.infoCard}>
                        <h3 className={styles.infoCardTitle}>Assistente Virtual CIDA</h3>
                        <p className={styles.infoText}>
                            Para contato sobre diversos serviços municipais.
                        </p>
                        <ul className={styles.contactList}>
                            <li>
                                <strong>WhatsApp:</strong> (82) 97604-5269
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContatoPage;
