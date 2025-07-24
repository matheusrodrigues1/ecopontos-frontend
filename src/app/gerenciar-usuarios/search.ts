import axios from "axios";

const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3001/users");
    return response;
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
    throw error;
  }
}

export default getUsers;
