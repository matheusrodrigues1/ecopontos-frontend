"use client";

import React, { useState } from 'react';
import styles from './style.module.css';

const InfoCard = ({ title, text }: { title: string, text: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <div className={`${styles.cardTextContainer} ${isExpanded ? styles.expanded : ''}`}>
                <p className={styles.cardText}>
                    {text}
                </p>
            </div>
            <button 
                className={styles.readMoreBtn} 
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'Ler menos' : 'Ler mais'}
            </button>
        </div>
    );
};

const SobreNosPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Sobre Nós</h2>
                    <p className={styles.intro}>
                        Os ecopontos são pontos estratégicos de coleta seletiva criados para receber 
                        materiais recicláveis e representar uma alternativa prática para o descarte correto em nossa cidade.
                    </p>
                </header>

                <div className={styles.highlightsGrid}>
                    <InfoCard 
                        title="Coleta Consciente"
                        text="Recebemos papel, plástico, vidro, metal e eletrônicos, evitando que sejam descartados inadequadamente no meio ambiente. Cada material destinado corretamente deixa de poluir rios e solos."
                    />
                    <InfoCard 
                        title="Sustentabilidade"
                        text="Promovemos a economia circular e a preservação de recursos naturais, reduzindo o volume de lixo nos aterros. Ao reciclar, economizamos energia e matéria-prima virgem."
                    />
                    <InfoCard 
                        title="Fácil de Participar"
                        text="Basta separar seus recicláveis e depositá-los no ecoponto mais próximo. Uma ação simples que fortalece a educação ambiental e serve de exemplo para as futuras gerações."
                    />
                </div>
            </div>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>
                        Nosso compromisso é com um futuro mais verde. Visite os ecopontos próximos 
                        à sua residência ou trabalho e faça parte desta iniciativa em prol de Arapiraca e do planeta.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default SobreNosPage;
