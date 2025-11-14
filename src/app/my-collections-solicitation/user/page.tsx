"use client";

import React, { useEffect, useState } from "react";
import myCollectionsUser from "./myCollections";
import getEcopointById from "../../ecopoints/getEcopointById";
import { useToastContext } from "@/contexts/ToastContext";
import { useAuth } from "@/app/hooks/useAuth";
import Navbar from "@/app/navbar/navbar";

import styles from "./style.module.css";

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

export default function UserCollectionsPage() {
    const { showToast } = useToastContext();

    const { user, isLoading } = useAuth();
    const [userId, setUserId] = useState<string | null>(null);

    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(false);
    const [ecopointsMap, setEcopointsMap] = useState<Record<string, any>>({});

    useEffect(() => {
        const resolvedUserId = user && (user.id || (user as any)._id || (user as any).userId);
        if (!resolvedUserId) return;
        setUserId(resolvedUserId);
        const fetchCollections = async () => {
            setLoading(true);
            try {
                const res = await myCollectionsUser(resolvedUserId as string);
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
                showToast("Erro ao carregar suas solicitações.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchCollections();
    }, [user, showToast]);

    const handleSetUser = () => {
        try {
            const fromStorage = localStorage.getItem("userId");
            if (fromStorage) {
                setUserId(fromStorage);
                return;
            }
        } catch (e) { }
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: 20 }} className={styles['my-solicitations']}>
                <h2>Minhas solicitações</h2>

                {!userId && (
                    <div>
                        {isLoading ? (
                            <div>Carregando usuário...</div>
                        ) : (
                            <>
                                <p>Não foi possível detectar `userId` no localStorage.</p>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <button onClick={handleSetUser}>Usar userId do localStorage</button>
                                    <button onClick={() => { const manual = prompt("Cole o seu userId (ex: 68e7df...):"); if (manual) { setUserId(manual); localStorage.setItem('userId', manual); } }}>Informar manualmente</button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {userId && (
                    <div>
                        {loading ? (
                            <div>Carregando solicitações...</div>
                        ) : collections.length === 0 ? (
                            <div>Você não possui solicitações.</div>
                        ) : (
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "left", padding: 8 }}>Data</th>
                                        <th style={{ textAlign: "left", padding: 8 }}>Ecoponto</th>
                                        <th style={{ textAlign: "left", padding: 8 }}>Quantidade (kg)</th>
                                        <th style={{ textAlign: "left", padding: 8 }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {collections.map(c => (
                                        <tr key={c._id} style={{ borderTop: "1px solid #eee" }}>
                                            <td style={{ padding: 8 }}>{new Date(c.createdAt).toLocaleString()}</td>
                                            <td style={{ padding: 8 }}>{ecopointsMap[c.ecopointId]?.title || ecopointsMap[c.ecopointId]?.name || c.ecopointId}</td>
                                            <td style={{ padding: 8 }}>{c.quantity}</td>
                                            <td style={{ padding: 8 }}>{c.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
