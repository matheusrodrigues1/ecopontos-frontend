"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar direto para o mapa
    router.push("/mapa");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#093A3E] mx-auto mb-4"></div>
        <p className="text-[#093A3E] text-lg font-bold">Carregando ECO ARAPIRACA...</p>
      </div>
    </div>
  );
}
