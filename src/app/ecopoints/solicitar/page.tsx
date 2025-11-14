"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { solicitarColeta, SolicitarPayload } from "./solicitar";
import { useToastContext } from "@/contexts/ToastContext";
import styles from "./style.module.css";
import { getEcopontos } from "../getEcopoints";
import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "@/app/navbar/navbar";

const MATERIAIS = ["Papel", "Plástico", "Vidro", "Metal", "Eletrônicos", "Orgânico", "Outros"];

const SolicitarColetaPage = () => {
  const router = useRouter();
  const { showToast } = useToastContext();

  const [ecopoints, setEcopoints] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({ material: "", quantity: 1, address: "", description: "" });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getEcopontos();
        setEcopoints(res || []);
      } catch (err) {
        showToast("Erro ao carregar empresas cadastradas.", "error");
      } finally {
        setLoadingList(false);
      }
    };
    fetch();
  }, [showToast]);

  const openModalFor = (ecopoint: any) => {
    setSelected(ecopoint);
    // start address empty - user should provide where collection must occur
    setForm({ material: "", quantity: 50, address: "", description: "" });
    setModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!selected) return;
    // Client-side validation: address must be provided
    if (!form.address || form.address.toString().trim() === "") {
      showToast("Preencha o endereço da coleta.", "error");
      return;
    }

    setIsSubmitting(true);

    const payload: SolicitarPayload = {
      ecopointId: selected.id || selected._id || selected.id,
      quantity: form.quantity,
      material: form.material,
      address: form.address,
      description: form.description,
    };

    try {
      await solicitarColeta(payload);
      showToast("Solicitação enviada com sucesso!", "success");
      setModalOpen(false);
    } catch (err) {
      showToast("Erro ao solicitar coleta, tente novamente.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ProtectedRoute>
        <Navbar />
        <div className={styles.pageContainer}>
          <div className={styles.card}>
            <button className={styles.backButton} onClick={() => router.back()}>← Voltar</button>
            <h2 className={styles.title}>Solicitar Coleta</h2>

            {loadingList ? (
              <div>Carregando empresas...</div>
            ) : (
              <div className={styles.listContainer}>
                {ecopoints.length === 0 ? (
                  <div>Nenhuma empresa encontrada.</div>
                ) : (
                  ecopoints.map(ep => (
                    <div key={ep.id || ep._id} className={styles.epCard}>
                      <div>
                        <div className={styles.epTitle}>{ep.title || ep.name}</div>
                        <div><strong>CNPJ:</strong> {ep.cnpj || ep.cpf}</div>
                        <div><strong>Endereço:</strong> {ep.address}</div>
                      </div>
                      <div>
                        <button className={styles.requestButton} onClick={() => openModalFor(ep)}>Solicitar Coleta</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {modalOpen && selected && (
              <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                  <h3>Solicitar coleta para: {selected.title || selected.name}</h3>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <label>Material</label>
                    <select name="material" value={form.material} onChange={handleChange} required>
                      <option value="">Selecione um material</option>
                      {MATERIAIS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>

                    <label>Quantidade (kg)</label>
                    <input name="quantity" type="number" min={1} value={form.quantity} onChange={handleChange} required />

                    <label>Endereço</label>
                    <input name="address" type="text" value={form.address} onChange={handleChange} required />

                    <label>Descrição</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} />

                    <div className={styles.modalActions}>
                      <button type="button" onClick={() => setModalOpen(false)} className={styles.cancelButton}>Cancelar</button>
                      <button type="submit" disabled={isSubmitting} className={styles.submitButton}>{isSubmitting ? 'Enviando...' : 'Solicitar Coleta'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default SolicitarColetaPage;
