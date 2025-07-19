import { getErrorMessage } from "@/app/exceptions/genericException";

import userRegister from "@/app/auth/register/userRegisterInterface";

import axios from "axios";

export const registerUser = async (formData: userRegister) => {
    try {
        const response = await axios.post("http://localhost:3001/auth/register", formData);
        return response.data;
    } catch (error) {
        return getErrorMessage(error, "Erro ao fazer cadastro");
    }
}