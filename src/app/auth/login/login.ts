import { getErrorMessage } from "@/app/exceptions/genericException";

import UserLogin from "@/app/auth/login/userLoginInterface";

import axios from "axios";

export const loginUser = async (formData: UserLogin) => {
    try {
        const response = await axios.post("http://localhost:3001/auth/login", formData);
        return response.data;
    } catch (error) {
        return getErrorMessage(error);
    }
}