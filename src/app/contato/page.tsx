"use client";

import React from 'react';
import styles from './style.module.css';

const ContatoPage = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Mensagem enviada! Obrigado por entrar em contato.");
        // Aqui você pode integrar envio real via API ou e-mail
    };

    return (
        <div className={styles.contato}>
            <h2 className={styles.contatoTitulo}>Contato</h2>

            <p className={styles.contatoTexto}>
                Tem alguma dúvida, sugestão ou deseja mais informações sobre os ecopontos? 
                Preencha o formulário abaixo e entraremos em contato o mais rápido possível.
            </p>

            <form className={styles.contatoFormulario} onSubmit={handleSubmit}>
                <input type="text" name="nome" placeholder="Seu nome" required />
                <input type="email" name="email" placeholder="Seu e-mail" required />
                <textarea name="mensagem" placeholder="Sua mensagem" rows={6} required></textarea>
                <button type="submit">Enviar Mensagem</button>
            </form>
        </div>
    );
};

export default ContatoPage;
