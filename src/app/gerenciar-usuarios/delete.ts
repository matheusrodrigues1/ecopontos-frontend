import axios from "axios";
import { getErrorMessage } from "../exceptions/genericException";

export const UserDeleteResponse = async (userId: string) => {
    try {
        const response = await axios.delete(`http://localhost:3001/users/${userId}`);
        return response.data;
    } catch (error) {
        return getErrorMessage(error, "Erro ao deletar usuário");
    }
}