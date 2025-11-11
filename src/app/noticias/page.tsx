"use client";

import React from 'react';
import styles from './style.module.css';

const NoticiasPage = () => {
    const noticias = [
        {
            id: 1,
            titulo: "Novos ecopontos são inaugurados em Arapiraca",
            data: "10 de Outubro de 2025",
            texto: "A Prefeitura de Arapiraca inaugurou mais dois ecopontos para ampliar o alcance da coleta seletiva. As novas unidades estão localizadas nos bairros Primavera e Cacimbas, e irão atender mais de 5 mil famílias, promovendo o descarte correto de resíduos recicláveis.",
            link: "#",
            categoria: "Infraestrutura"
        },
        {
            id: 2,
            titulo: "Campanha de educação ambiental é lançada nas escolas municipais",
            data: "5 de Outubro de 2025",
            texto: "O projeto 'Reciclar é Cuidar' está sendo aplicado em 15 escolas municipais, ensinando alunos sobre separação de lixo e sustentabilidade. A ação faz parte de um conjunto de políticas públicas voltadas à preservação ambiental em Arapiraca.",
            link: "#",
            categoria: "Educação"
        },
        {
            id: 3,
            titulo: "Semana do Meio Ambiente tem mutirão de limpeza e plantio de árvores",
            data: "1 de Outubro de 2025",
            texto: "Durante a Semana do Meio Ambiente, voluntários e servidores participaram de um grande mutirão de limpeza e plantio de mais de 300 mudas de árvores nativas em áreas públicas da cidade, reforçando o compromisso com um futuro mais verde.",
            link: "#",
            categoria: "Ação Comunitária"
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Notícias
                        <span className={styles.gradientText}> de Arapiraca</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Acompanhe as últimas iniciativas e projetos para um futuro sustentável
                    </p>
                </div>
            </div>

            <div className={styles.noticiasGrid}>
                {noticias.map((noticia, index) => (
                    <div 
                        key={noticia.id} 
                        className={styles.noticiaCard}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className={styles.cardHeader}>
                            <span className={styles.categoria}>{noticia.categoria}</span>
                            <span className={styles.data}>{noticia.data}</span>
                        </div>
                        <h3 className={styles.noticiaTitulo}>{noticia.titulo}</h3>
                        <p className={styles.noticiaTexto}>{noticia.texto}</p>
                        <a href={noticia.link} className={styles.leiaMais}>
                            <span>Leia mais</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoticiasPage;
