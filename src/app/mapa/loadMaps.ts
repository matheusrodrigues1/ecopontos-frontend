export const LoadGoogleMapsScript = () => {
    return new Promise<void>((resolve, reject) => {
        if (window.google) {
            resolve();
            return;
        }

        const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
        console.log('API Key carregada:', apiKey ? 'Configurada' : 'Não encontrada');

        if (!apiKey) {
            reject(new Error('Chave da API do Google Maps não configurada'));
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
    });
};