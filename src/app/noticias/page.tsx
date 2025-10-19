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
            link: "#"
        },
        {
            id: 2,
            titulo: "Campanha de educação ambiental é lançada nas escolas municipais",
            data: "5 de Outubro de 2025",
            texto: "O projeto 'Reciclar é Cuidar' está sendo aplicado em 15 escolas municipais, ensinando alunos sobre separação de lixo e sustentabilidade. A ação faz parte de um conjunto de políticas públicas voltadas à preservação ambiental em Arapiraca.",
            link: "#"
        },
        {
            id: 3,
            titulo: "Semana do Meio Ambiente tem mutirão de limpeza e plantio de árvores",
            data: "1 de Outubro de 2025",
            texto: "Durante a Semana do Meio Ambiente, voluntários e servidores participaram de um grande mutirão de limpeza e plantio de mais de 300 mudas de árvores nativas em áreas públicas da cidade, reforçando o compromisso com um futuro mais verde.",
            link: "#"
        }
    ];

    return (
        <div className={styles.noticias}>
            <h2 className={styles.noticiasTitulo}>Notícias</h2>

            {noticias.map((noticia) => (
                <div key={noticia.id} className={styles.noticiaCard}>
                    <h3 className={styles.noticiaTitulo}>{noticia.titulo}</h3>
                    <p className={styles.noticiaData}>{noticia.data}</p>
                    <p className={styles.noticiaTexto}>{noticia.texto}</p>
                    <a href={noticia.link} className={styles.leiaMais}>Leia mais →</a>
                </div>
            ))}
        </div>
    );
};

export default NoticiasPage;
