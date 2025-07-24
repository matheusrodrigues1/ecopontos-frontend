import axios from "axios";

const registerUser = async (userData: { name: string; email: string; password: string }) => {
    try {
        const response = await axios.post("http://localhost:3001/auth/register", userData);
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        throw error;
    }
}

export default registerUser;
