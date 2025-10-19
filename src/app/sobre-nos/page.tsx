"use client";

import React from 'react';
import styles from './style.module.css';

const SobreNosPage = () => {
    return (
        <div className={styles.sobreNos + " w-full max-w-5xl mx-auto p-8 md:p-12"}>
            {/* Título */}
            <h2 className={styles.sobreNosTitulo}>Sobre nós</h2>

            {/* Texto explicativo */}
            <p className={styles.sobreNosTexto}>
                Os ecopontos são pontos estratégicos de coleta seletiva criados para receber materiais recicláveis
                como papel, papelão, vidro, plástico, metal e resíduos eletrônicos. Eles representam uma alternativa
                prática para que a população possa destinar seus resíduos de forma correta, evitando que
                lixo reciclável seja descartado de maneira inadequada e impacte o meio ambiente.  
                <br /><br />
                Além de promover a separação de resíduos, os ecopontos também têm o objetivo de conscientizar
                a população sobre a importância da sustentabilidade e da responsabilidade ambiental.
                Cada material coletado nos ecopontos passa por processos de reciclagem que contribuem para
                a economia circular, reduzindo a quantidade de lixo que chega aos aterros e preservando
                recursos naturais.  
                <br /><br />
                Participar é simples: basta separar corretamente seus materiais recicláveis e depositá-los
                nos ecopontos disponíveis em diferentes regiões da cidade. Esta ação, além de ambientalmente
                correta, fortalece a educação ambiental nas comunidades e incentiva hábitos sustentáveis desde cedo.  
                <br /><br />
                Nosso compromisso é com um futuro mais verde e consciente, oferecendo à população alternativas
                práticas para colaborar com a redução de resíduos e a proteção do meio ambiente. 
                Visite os ecopontos próximos à sua residência ou trabalho e faça parte desta iniciativa em prol
                de Arapiraca e do planeta.
            </p>
        </div>
    );
};

export default SobreNosPage;
