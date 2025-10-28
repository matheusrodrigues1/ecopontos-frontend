"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import prefeituraLogo from "../../../public/prefeitura_arapiraca_logo.png"
import { getEcopontos } from '../ecopoints/getEcopoints';
import { LoadGoogleMapsScript } from './loadMaps';
import { EcoPoint } from '@/app/types/ecopoints/ecopoints';
import styles from './style.module.css';

const MapPage = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [ecoPoints, setEcoPoints] = useState<EcoPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<{ name: string; role: string } | null>(null);
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, [map, infoWindow]);

    useEffect(() => {
        if (!isMounted) return;

        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setUser(JSON.parse(userData));
        }
    }, [isMounted]);

    // Logout
    const handleLogout = () => {
        if (!isMounted) return;

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/mapa');
    };

    const loadEcoPoints = async () => {
        const response = await getEcopontos();
        if (response) {
            setEcoPoints(response);
            return response;
        } else {
            setError('Erro ao carregar ecopontos');
            return [];
        }
    };

    const loadGoogleMapsScript = () => {
        return LoadGoogleMapsScript();
    };

    const initializeMap = async (ecoPointsData: EcoPoint[] = []) => {
        if (!mapRef.current || !window.google) return;

        try {
            const arapiraca = { lat: -9.7519, lng: -36.6611 };

            const mapInstance = new window.google.maps.Map(mapRef.current, {
                zoom: 13,
                center: arapiraca,
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: false,
                streetViewControl: true,
                rotateControl: false,
                fullscreenControl: true,
                gestureHandling: 'greedy',
                clickableIcons: true
            });

            setMap(mapInstance);

            const infoWindowInstance = new window.google.maps.InfoWindow();
            setInfoWindow(infoWindowInstance);

            console.log('Criando marcadores para:', ecoPointsData.length, 'ecopontos');
            ecoPointsData.forEach((ecoPoint, index) => {
                const [lat, lng] = ecoPoint.coordinates.split(',').map((coord: string) => parseFloat(coord.trim()));

                console.log(`Criando marcador ${index + 1}:`, {
                    title: ecoPoint.title,
                    lat: lat,
                    lng: lng,
                    coordinates: ecoPoint.coordinates
                });

                const marker = new window.google.maps.Marker({
                    position: { lat: lat, lng: lng },
                    map: mapInstance,
                    title: ecoPoint.title,
                });

                const contentString = `
                    <div style="max-width: 300px; font-family: Arial, sans-serif;">
                        <h3 style="color: #093A3E; margin: 0 0 12px 0; font-size: 18px; font-weight: bold;">${ecoPoint.title}</h3>
                        
                        <div style="margin-bottom: 10px;">
                            <strong style="color: #333; font-weight: bold; font-size: 13px;">CNPJ:</strong>
                            <br><span style="color: #666; font-size: 12px;">${ecoPoint.cnpj}</span>
                        </div>
                        
                        <div style="margin-bottom: 10px;">
                            <strong style="color: #333; font-weight: bold; font-size: 13px;">Endereço:</strong>
                            <br><span style="color: #666; font-size: 12px;">${ecoPoint.address}</span>
                        </div>
                        
                        <div style="margin-bottom: 10px;">
                            <strong style="color: #333; font-weight: bold; font-size: 13px;">Materiais Aceitos:</strong>
                            <br><div style="margin-top: 6px;">
                                ${ecoPoint.accepted_materials.map(material =>
                    `<span style="display: inline-block; background: #e8f5e8; color: #2d5a2d; padding: 3px 8px; border-radius: 12px; font-size: 11px; margin: 2px; font-weight: 500;">${material}</span>`
                ).join('')}
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 10px;">
                            <strong style="color: #333; font-weight: bold; font-size: 13px;">Horário de Funcionamento:</strong>
                            <br><span style="color: #666; font-size: 12px;">${ecoPoint.opening_hours}</span>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <strong style="color: #333; font-weight: bold; font-size: 13px;">Intervalo:</strong>
                            <br><span style="color: #666; font-size: 12px;">${ecoPoint.interval}</span>
                        </div>
                        
                        <div style="text-align: center; border-top: 1px solid #eee; padding-top: 12px;">
                            <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" 
                               target="_blank" 
                               style="background: #093A3E; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: bold; display: inline-block; transition: all 0.3s;">
                               🧭 Como Chegar
                            </a>
                        </div>
                    </div>
                `;

                marker.addListener('click', () => {
                    infoWindowInstance.setContent(contentString);
                    infoWindowInstance.open(mapInstance, marker);
                });
            });

            setIsLoading(false);
        } catch (error) {
            console.error('Erro ao carregar o mapa:', error);
            setError('Erro ao carregar o mapa do Google');
            setIsLoading(false);
        }
    };


    const initializeAll = useCallback(async () => {
        try {
            setIsLoading(true);
            await loadGoogleMapsScript();
            const ecoPointsData = await loadEcoPoints();
            await initializeMap(ecoPointsData);
        } catch (error) {
            console.error('Erro ao inicializar:', error);
            setError(error instanceof Error ? error.message : 'Erro ao carregar recursos do mapa');
            setIsLoading(false);
        }
    }, [loadGoogleMapsScript, loadEcoPoints, initializeMap]);

    useEffect(() => {
        if (!isMounted) return;
        initializeAll();
    }, [isMounted]);

    if (!isMounted) {
        return (
            <div className="flex flex-col h-screen bg-white">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#093A3E] mx-auto mb-4"></div>
                        <p className="text-gray-600">Inicializando aplicação...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-white" suppressHydrationWarning>
            <header
                className="text-white p-4 shadow-lg"
                style={{ backgroundColor: '#093A3E' }}
                suppressHydrationWarning
            >
                <div className="w-full flex items-center max-w-7xl mx-auto">
                    <div className="flex-shrink-0">
                        <img
                            src={prefeituraLogo.src}
                            alt="Logo"
                            style={{
                                width: '200px',
                                height: '80px',
                                paddingLeft: '12px',
                                paddingTop: '12px',
                                paddingBottom: '12px'
                            }}
                        />
                    </div>

                    <div className="flex-1 flex justify-center">
                        <span className="text-xl font-medium text-center whitespace-nowrap">
                            Mapa de Ecopontos
                        </span>
                    </div>

                    <div className={styles.botoesNav}>
                        <button
                            onClick={() => router.push('/sobre-nos')}
                            className={`${styles.botao} ${styles.sobreNosBtn}`}
                        >
                            Sobre Nós
                        </button>

                        <button
                            onClick={() => router.push('/noticias')}
                            className={`${styles.botao} ${styles.noticiasBtn}`}
                        >
                            Notícias
                        </button>

                        <button
                            onClick={() => router.push('/contato')}
                            className={`${styles.botao} ${styles.contatoBtn}`}
                        >
                            Contato
                        </button>
                    </div>

                    <div className="flex-shrink-0 flex items-center gap-4">
                        {!isLoading && !error && (
                            <span
                                className="text-xs px-4 py-2 rounded-full"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    color: '#ffffff'
                                }}
                            >
                                {ecoPoints.length > 0
                                    ? `📍 ${ecoPoints.length} ecoponto(s)`
                                    : '❌ Nenhum ecoponto'}
                            </span>
                        )}

                        <div className="flex items-center gap-3">
                            {user ? (
                                <>
                                    <span className="text-sm whitespace-nowrap">
                                        Olá, {user.name} ({user.role === 'admin' ? 'Admin' : 'Usuário'})
                                    </span>

                                    <button
                                        onClick={() => router.push('/menu')}
                                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out"
                                        style={{
                                            backgroundColor: '#059669',
                                            color: 'white',
                                            border: '8px solid transparent',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#047857';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#059669';
                                        }}
                                    >
                                        Menu
                                    </button>

                                    {user.role === 'admin' && (
                                        <button
                                            onClick={() => router.push('/gerenciar-usuarios')}
                                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out"
                                            style={{
                                                backgroundColor: '#2563eb',
                                                color: 'white',
                                                border: '8px solid transparent',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#008B8B';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#2563eb';
                                            }}
                                        >
                                            Usuários
                                        </button>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out"
                                        style={{
                                            backgroundColor: '#dc2626',
                                            color: 'white',
                                            border: '8px solid transparent',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#b91c1c';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#dc2626';
                                        }}
                                    >
                                        Sair
                                    </button>
                                </>
                            ) : (
                                    <button
                                    onClick={() => router.push('/login')}
                                    className={styles.loginBtn}
                                    >
                                    Login
                                    </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <section className={styles.infoSection}>
                <h2>Como funcionam os Ecopontos?</h2>
                <p className={styles.infoText}>
                    Os Ecopontos são locais criados para receber materiais recicláveis como vidro, papel, plástico e metal. 
                    Eles ajudam a reduzir o lixo nas ruas e contribuem para a preservação do meio ambiente. 
                    Basta separar corretamente os resíduos e levá-los ao Ecoponto mais próximo.
                </p>
            </section>

            <section className={styles.benefitsSection}>
                <h2>Por que utilizar os Ecopontos?</h2>
                <div className={styles.benefitsGrid}>
                    <div>
                        ♻️ <strong>Reciclagem</strong>
                        <p>Ajude a transformar resíduos em novos produtos.</p>
                    </div>
                    <div>
                        🌍 <strong>Meio Ambiente</strong>
                        <p>Reduza o impacto ambiental da sua cidade.</p>
                    </div>
                    <div>
                        👨‍👩‍👧‍👦 <strong>Comunidade</strong>
                        <p>Contribua para uma Arapiraca mais limpa e sustentável.</p>
                    </div>
                </div>
            </section>

            {isLoading && !error && (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#093A3E] mx-auto mb-4"></div>
                        <p className="text-gray-600">Carregando mapa e ecopontos...</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center max-w-md mx-auto p-6">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Ops! Algo deu errado.</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        {error.includes('API') && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                                <p><strong>Dica:</strong> Verifique se a chave da API do Google Maps está configurada corretamente no arquivo .env.local</p>
                            </div>
                        )}
                        <button
                            onClick={() => {
                                setError(null);
                                setIsLoading(true);
                                initializeAll();
                            }}
                            className="mt-4 px-4 py-2 bg-[#093A3E] text-white rounded-lg hover:bg-[#0a4a4f] transition-colors"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            )}

            {!error && (
                <div className="relative w-full max-w-4xl mx-auto my-4">
                    <div
                        ref={mapRef}
                        className="w-full h-200 md:h-120 rounded-lg shadow-md"
                    />

                    <style jsx global>{`
                        /* Ocultar seta de voltar específica da aplicação */
                        img[alt="Seta para voltar"] {
                            display: none !important;
                        }
                        
                        /* Ocultar por src da imagem */
                        img[src*="layout.c0070b7b.png"] {
                            display: none !important;
                        }
                        
                        /* Ocultar por srcset da imagem */
                        img[srcset*="layout.c0070b7b.png"] {
                            display: none !important;
                        }
                        
                        /* Ocultar por classes específicas */
                        img.w-\\[47px\\].h-\\[47px\\].\\!bg-white.cursor-pointer {
                            display: none !important;
                        }
                        
                        /* Ocultar setas de voltar e controles desnecessários do Google Maps */
                        .gm-style button[title="Voltar"],
                        .gm-style button[aria-label*="voltar"],
                        .gm-style button[aria-label*="Voltar"],
                        .gm-style button[aria-label*="back"],
                        .gm-style button[aria-label*="Back"] {
                            display: none !important;
                        }
                        
                        /* Ocultar outros controles de navegação específicos */
                        .gm-control-active.gm-control-active {
                            display: none !important;
                        }
                        
                        /* Ocultar elementos que podem conter a seta de voltar */
                        .gm-style .gm-bundled-control div[role="button"][tabindex="0"]:first-child {
                            display: none !important;
                        }
                    `}</style>
                </div>
            )}

            {/* {!error && (
            <div className={styles.mapContainer}>
                <div
                ref={mapRef}
                className={styles.map}
                />
            </div>
            )} */}
            <section className={styles.testimonialsSection}>
                <h2>O que dizem sobre os Ecopontos?</h2>
                <div className={styles.testimonialsGrid}>
                    <div className={styles.testimonialCard}>
                        <p>“Levar meus recicláveis para o Ecoponto virou um hábito. É rápido, prático e ainda ajudo o meio ambiente!”</p>
                        <span>- Maria Souza, moradora do centro</span>
                    </div>
                    <div className={styles.testimonialCard}>
                        <p>“Os Ecopontos facilitaram muito o descarte correto de materiais. A cidade ficou muito mais limpa!”</p>
                        <span>- João Pereira, comerciante</span>
                    </div>
                    <div className={styles.testimonialCard}>
                        <p>“Eu nem imaginava que dava para reciclar tanta coisa. Hoje ensino meus filhos a separar o lixo em casa.”</p>
                        <span>- Ana Oliveira, professora</span>
                    </div>
                </div>
            </section>
            <section className={styles.callToAction}>
                <h2>Participe você também!</h2>
                <p>Visite o Ecoponto mais próximo e ajude a construir um futuro mais verde para Arapiraca.</p>
                <button onClick={() => router.push('/sobre-nos')}>Saiba mais</button>
            </section>

            <footer className={styles.footer}>
                <p>© 2025Prefeitura de Arapiraca — Projeto Ecopontos.</p>
            </footer>
        </div>
    );
};

export default MapPage;
