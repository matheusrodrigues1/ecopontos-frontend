"use client";

import React, { useEffect, useState } from "react";
import solicitationsFromMyEcoponint from "./solicitationsFromMyEcoponint";
import getEcopointById from "../../ecopoints/getEcopointById";
import { useToastContext } from "@/contexts/ToastContext";
import { useAuth } from "@/app/hooks/useAuth";
import Navbar from "@/app/navbar/navbar";
import styles from "../user/style.module.css";
import updateRequestStatus from "./updateRequestStatus";

import { useRouter } from "next/navigation";

type Collection = {
  _id: string;
  userId: string;
  companyId: string;
  ecopointId: string;
  quantity: number;
  status: string;
  notified?: boolean;
  createdAt: string;
  updatedAt?: string;
};

export default function CompanyCollectionsPage() {
  const { showToast } = useToastContext();
  const { user, isLoading } = useAuth();
  const [companyId, setCompanyId] = useState<string | null>(null);

  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const [ecopointsMap, setEcopointsMap] = useState<Record<string, any>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<Collection | null>(null);
  const [newStatus, setNewStatus] = useState<string>("pendente");

  const router = useRouter();

  useEffect(() => {
    // Derive companyId from authenticated user if possible
    const resolvedCompanyId = user && (user.id || (user as any)._id || (user as any).userId);
    if (!resolvedCompanyId) return;
    setCompanyId(resolvedCompanyId);

    const fetchCollections = async () => {
      setLoading(true);
      try {
        const res = await solicitationsFromMyEcoponint(resolvedCompanyId as string);
        const data: Collection[] = res.data || res;
        setCollections(data || []);

        // fetch ecopoints names for unique ids
        const ids = Array.from(new Set(data.map(d => d.ecopointId).filter(Boolean)));
        const fetched: Record<string, any> = {};
        await Promise.all(ids.map(async id => {
          const ep = await getEcopointById(id);
          if (ep) fetched[id] = ep;
        }));
        setEcopointsMap(fetched);
      } catch (err) {
        console.error(err);
        showToast("Erro ao carregar solicitações da empresa.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [user, showToast]);

  const handleSetCompany = () => {
    try {
      const fromStorage = localStorage.getItem("companyId") || localStorage.getItem("userId");
      if (fromStorage) {
        setCompanyId(fromStorage);
        return;
      }
    } catch (e) { }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }} className={styles['my-solicitations']}>
        <button className={styles.backButton} onClick={() => router.back()}>
          ← Voltar
        </button>
        <h2>Solicitações para minha empresa</h2>

        {!companyId && (
          <div>
            {isLoading ? (
              <div>Carregando usuário...</div>
            ) : (
              <>
                <p>Não foi possível detectar `companyId` no localStorage.</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={handleSetCompany}>Usar companyId do localStorage</button>
                  <button onClick={() => { const manual = prompt("Cole o companyId (ex: 68e7e3...):"); if (manual) { setCompanyId(manual); } }}>Informar manualmente</button>
                </div>
              </>
            )}
          </div>
        )}

        {companyId && (
          <div>
            {loading ? (
              <div>Carregando solicitações...</div>
            ) : collections.length === 0 ? (
              <div>Não há solicitações para sua empresa.</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: 8 }}>Data</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Ecoponto</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Endereço (se disponível)</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Quantidade (kg)</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Status</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map(c => (
                    <tr key={c._id} style={{ borderTop: "1px solid #eee" }}>
                      <td style={{ padding: 8 }}>{new Date(c.createdAt).toLocaleString()}</td>
                      <td style={{ padding: 8 }}>{ecopointsMap[c.ecopointId]?.title || ecopointsMap[c.ecopointId]?.name || c.ecopointId}</td>
                      <td style={{ padding: 8 }}>{ecopointsMap[c.ecopointId]?.address || '-'}</td>
                      <td style={{ padding: 8 }}>{c.quantity}</td>
                      <td style={{ padding: 8 }}>{c.status}</td>
                      <td style={{ padding: 8 }}>
                        <button className={styles.actionButton} onClick={() => { setEditingRequest(c); setNewStatus(c.status); setModalOpen(true); }}>
                          <span className={styles.actionIcon} aria-hidden>
                            {/* pencil/modify SVG icon */}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor" />
                              <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor" />
                            </svg>
                          </span>
                          Alterar status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {modalOpen && editingRequest && (
              <div className={styles['modalOverlay']}>
                <div className={styles['modal']}>
                  <h3>Alterar status da solicitação</h3>
                  <p>Solicitação: {editingRequest._id}</p>
                  <label>Status</label>
                  <select className={styles.select} value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                    <option value="pendente">pendente</option>
                    <option value="aceita">aceita</option>
                    <option value="em_coleta">em_coleta</option>
                    <option value="finalizada">finalizada</option>
                    <option value="recusada">recusada</option>
                  </select>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    <button onClick={() => { setModalOpen(false); setEditingRequest(null); }} className={styles['cancelButton']}>Cancelar</button>
                    <button onClick={async () => {
                      try {
                        await updateRequestStatus(editingRequest._id, newStatus);
                        showToast('Status atualizado com sucesso.', 'success');
                        // refresh list
                        const res = await solicitationsFromMyEcoponint(companyId as string);
                        setCollections(res.data || res);
                      } catch (err) {
                        console.error(err);
                        showToast('Erro ao atualizar status.', 'error');
                      } finally {
                        setModalOpen(false);
                        setEditingRequest(null);
                      }
                    }} className={styles['submitButton']}>Salvar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
