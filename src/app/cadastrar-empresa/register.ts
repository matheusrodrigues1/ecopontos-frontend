import axios from "axios";

const registerEnterprise = async (
  userData: { name: string; email: string; password: string },
  token: string // token de admin
) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/register-enterprise",
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // envia token JWT
        },
      }
    );

    return response.data; // retorna dados da empresa criada
  } catch (error: any) {
    console.error("Erro ao registrar empresa:", error.response?.data || error);
    throw error;
  }
};

export default registerEnterprise;
