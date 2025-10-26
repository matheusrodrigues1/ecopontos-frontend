import axios from "axios";

const getEnterprises = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:3001/users/role/enterprise", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao obter empresas:", error);
    throw error;
  }
};

export default getEnterprises;
