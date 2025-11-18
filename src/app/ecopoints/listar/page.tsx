"use client";

import React, { useState, useEffect } from "react";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useToastContext } from "@/contexts/ToastContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import { getEcopontos } from "../getEcopoints";
import { handleDeleteEcoponto } from "../excluir/deleteEcoponto";
import { EcoPointList } from "@/app/types/ecopoints/ecopoints";
import Navbar from "@/app/navbar/navbar";

const Listar = () => {
    const [ecopoints, setEcopoints] = useState<EcoPointList[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);
    const { showToast } = useToastContext();
    const router = useRouter();

    useEffect(() => {
        const fetchEcopoints = async () => {
            try {
                const response = await getEcopontos();
                console.log("Ecopontos fetched:", response);
                setEcopoints(response);
            } catch (error) {
                console.error("Erro ao carregar ecopontos:", error);
                showToast("Erro ao carregar lista de ecopontos.", "error");
            } finally {
                setIsLoading(false);
            }
        };
        fetchEcopoints();
    }, [showToast]);

    const handleEdit = (ecopoint: EcoPointList) => {
        localStorage.setItem('editingEcopoint', JSON.stringify(ecopoint));
        router.push('/ecopoints/editar');
    };

    const handleDeleteClick = (id: string, title: string) => {
        setPendingDelete({ id, title });
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            await handleDeleteEcoponto(pendingDelete.id, pendingDelete.title);
            setEcopoints(ecopoints.filter(ep => ep.id !== pendingDelete.id));
            showToast("Ecoponto excluído com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao excluir ecoponto:", error);
            showToast("Erro ao excluir ecoponto.", "error");
        } finally {
            setConfirmOpen(false);
            setPendingDelete(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center w-screen h-screen gap-10 bg-white justify-center">
                <span className="font-bold text-2xl text-black">Carregando ecopontos...</span>
            </div>
        );
    }

    return (
        <>
            <ProtectedRoute>
                <div className="flex flex-col w-screen min-h-screen bg-white">
                    <Navbar />
                    <div className="flex items-center w-full" style={{ paddingLeft: '10px', paddingRight: '16px', marginTop: '10px', marginBottom: '20px' }}>
                        <button
                            onClick={() => router.push("/menu")}
                            className="transition-colors"
                            style={{
                                backgroundColor: '#093A3E',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#0c4a4f';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#093A3E';
                            }}
                        >
                            ← Voltar
                        </button>

                        <div className="flex-1 flex justify-center">
                            <span className="font-bold text-2xl text-[#093A3E]">
                                Meus Ecopontos
                            </span>
                        </div>

                        <button
                            onClick={() => router.push('/ecopoints/cadastrar')}
                            className="transition-colors"
                            style={{
                                backgroundColor: '#093A3E',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#0c4a4f';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#093A3E';
                            }}
                        >
                            + Novo Ecoponto
                        </button>
                    </div>

                    <div className="flex-1 flex justify-center px-6">
                        {!ecopoints || ecopoints.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-gray-600 mb-6 text-lg">Nenhum ecoponto cadastrado ainda.</p>
                            </div>
                        ) : (
                            <div className="w-full max-w-6xl ">
                                {ecopoints && ecopoints.map((ecopoint) => (
                                    <div
                                        key={ecopoint.id}
                                        style={{
                                            border: '2px solid #093A3E',
                                            borderRadius: '8px',
                                            padding: '24px',
                                            backgroundColor: '#0C4A4F',
                                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                            marginBottom: '24px'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ flex: '1' }}>
                                                <h2
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 'bold',
                                                        color: 'white',
                                                        marginBottom: '16px',
                                                        border: 'none',
                                                        borderBottom: 'none'
                                                    }}
                                                >
                                                    {ecopoint.title}
                                                </h2>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 12px', fontSize: '14px' }}>
                                                    <div>
                                                        <span style={{ fontWeight: 'bold', color: 'white' }}>CNPJ:</span> <span style={{ color: '#FFFAFA', fontWeight: 'normal' }}>{ecopoint.cnpj}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: 'bold', color: 'white' }}>Horário:</span> <span style={{ color: '#FFFAFA', fontWeight: 'normal' }}>{ecopoint.opening_hours}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: 'bold', color: 'white' }}>Intervalo:</span> <span style={{ color: '#FFFAFA', fontWeight: 'normal' }}>{ecopoint.interval}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: 'bold', color: 'white' }}>Endereço:</span> <span style={{ color: '#FFFAFA', fontWeight: 'normal' }}>{ecopoint.address}</span>
                                                    </div>
                                                    <div style={{ gridColumn: 'span 2' }}>
                                                        <span style={{ fontWeight: 'bold', color: 'white' }}>Materiais aceitos:</span> <span style={{ color: '#FFFAFA', fontWeight: 'normal' }}>{ecopoint.accepted_materials.join(", ")}</span>
                                                    </div>
                                                    <div style={{ gridColumn: 'span 2' }}>
                                                        <span style={{ fontWeight: 'bold', color: 'white' }}>Coordenadas:</span> <span style={{ color: '#FFFAFA', fontWeight: 'normal' }}>{ecopoint.coordinates}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '12px', marginLeft: '24px' }}>
                                                <button
                                                    onClick={() => handleEdit(ecopoint)}
                                                    style={{
                                                        padding: '8px 16px',
                                                        border: '1px solid #fb923c',
                                                        color: '#ea580c',
                                                        borderRadius: '4px',
                                                        backgroundColor: 'white',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        fontWeight: '500',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#fef3f2';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'white';
                                                    }}
                                                >
                                                    ✏️ Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(ecopoint.id, ecopoint.title)}
                                                    style={{
                                                        padding: '8px 16px',
                                                        backgroundColor: '#dc2626',
                                                        color: 'white',
                                                        borderRadius: '4px',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        fontWeight: '500',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#b91c1c';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#dc2626';
                                                    }}
                                                >
                                                    🗑️ Excluir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <ConfirmDialog
                    open={confirmOpen}
                    title="Confirmar exclusão"
                    message={pendingDelete ? `Tem certeza que deseja excluir o ecoponto "${pendingDelete.title}"?` : ""}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => { setConfirmOpen(false); setPendingDelete(null); }}
                />
            </ProtectedRoute>
        </>
    );
};

export default Listar;
