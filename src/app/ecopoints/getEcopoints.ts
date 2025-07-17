import axios from '../utils/axios';

export const getEcopontos = async () => {
    try {
        const response = await axios.get('http://localhost:3001/ecopoints');
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar ecopontos:', error);
        throw error;
    }
};