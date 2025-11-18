import axios from '../utils/axios';

export const getEcopontos = async (companyId?: string) => {
    let resolvedCompanyId = companyId;
    if (!resolvedCompanyId) {
        try {
            resolvedCompanyId = localStorage.getItem('companyId') || undefined;
            if (!resolvedCompanyId) {
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    resolvedCompanyId = user && (user.companyId || user.id || user._id || user.userId) || undefined;
                }
            }
        } catch (e) {
            resolvedCompanyId = undefined;
        }
    }

    try {
        if (resolvedCompanyId) {
            const response = await axios.get(`http://localhost:3001/ecopoints/my-ecopoints/${resolvedCompanyId}`);
            return response.data;
        } else {
            const response = await axios.get('http://localhost:3001/ecopoints');
            return response.data;
        }
    } catch (error) {
        console.error('Erro ao carregar ecopontos:', error);
        throw error;
    }
};