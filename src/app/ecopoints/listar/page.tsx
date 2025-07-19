"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import { getEcopontos } from "../getEcopoints";
import { handleDeleteEcoponto } from "../excluir/deleteEcoponto";
import { EcoPointList } from "@/app/types/ecopoints/ecopoints";

const Listar = () => {
    const [ecopoints, setEcopoints] = useState<EcoPointList[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchEcopoints = async () => {
            try {
                const response = await getEcopontos();
                console.log("Ecopontos fetched:", response);
                setEcopoints(response);
            } catch (error) {
                console.error("Erro ao carregar ecopontos:", error);
                alert("Erro ao carregar lista de ecopontos.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEcopoints();
    }, []);

    const handleEdit = (ecopoint: EcoPointList) => {
        localStorage.setItem('editingEcopoint', JSON.stringify(ecopoint));
        router.push('/ecopoints/editar');
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Tem certeza que deseja excluir o ecoponto "${title}"?`)) {
            return;
        }

        try {
            await handleDeleteEcoponto(id, title);
            setEcopoints(ecopoints.filter(ep => ep.id !== id));
        } catch (error) {
            console.error("Erro ao excluir ecoponto:", error);
            alert("Erro ao excluir ecoponto.");
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
        <ProtectedRoute>
            <div className="flex flex-col w-screen min-h-screen bg-white">
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
                        <span className="font-bold text-2xl text-black">
                            Lista de Ecopontos
                        </span>
                    </div>

                    <button
                        onClick={() => router.push('/cadastrar')}
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
                            <button
                                onClick={() => router.push('/cadastrar')}
                                className="px-8 py-4 bg-[#093A3E] text-white rounded-lg hover:bg-[#0c4a4f] transition-colors duration-200 font-medium text-lg"
                            >
                                Cadastrar Primeiro Ecoponto
                            </button>
                        </div>
                    ) : (
                        <div className="w-full max-w-6xl">
                            {ecopoints && ecopoints.map((ecopoint) => (
                                <div
                                    key={ecopoint.id}
                                    style={{
                                        border: '2px solid #093A3E',
                                        borderRadius: '8px',
                                        padding: '24px',
                                        backgroundColor: 'white',
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
                                                    color: 'black',
                                                    marginBottom: '16px',
                                                    border: 'none',
                                                    borderBottom: 'none'
                                                }}
                                            >
                                                {ecopoint.title}
                                            </h2>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 12px', fontSize: '14px' }}>
                                                <div>
                                                    <span style={{ fontWeight: 'bold', color: 'black' }}>CNPJ:</span> <span style={{ color: '#374151', fontWeight: 'normal' }}>{ecopoint.cnpj}</span>
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: 'bold', color: 'black' }}>Horário:</span> <span style={{ color: '#374151', fontWeight: 'normal' }}>{ecopoint.opening_hours}</span>
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: 'bold', color: 'black' }}>Intervalo:</span> <span style={{ color: '#374151', fontWeight: 'normal' }}>{ecopoint.interval}</span>
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: 'bold', color: 'black' }}>Endereço:</span> <span style={{ color: '#374151', fontWeight: 'normal' }}>{ecopoint.address}</span>
                                                </div>
                                                <div style={{ gridColumn: 'span 2' }}>
                                                    <span style={{ fontWeight: 'bold', color: 'black' }}>Materiais aceitos:</span> <span style={{ color: '#374151', fontWeight: 'normal' }}>{ecopoint.accepted_materials.join(", ")}</span>
                                                </div>
                                                <div style={{ gridColumn: 'span 2' }}>
                                                    <span style={{ fontWeight: 'bold', color: 'black' }}>Coordenadas:</span> <span style={{ color: '#374151', fontWeight: 'normal' }}>{ecopoint.coordinates}</span>
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
                                                onClick={() => handleDelete(ecopoint.id, ecopoint.title)}
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
        </ProtectedRoute>
    );
};

export default Listar;
