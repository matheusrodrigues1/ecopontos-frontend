import axios from "axios";

const updateUser = async (userId: string, userData: { name: string; email: string; password?: string }) => {
    try {
        const response = await axios.put(`http://localhost:3001/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw error;
    }
}

export default updateUser;
