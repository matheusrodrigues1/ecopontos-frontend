import axios from "axios";

export const deleteEco = async (id: string) => {
    try {
        const response = await axios.delete(`http://localhost:3001/ecopoints/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir ecoponto:", error);
        throw error;
    }
}