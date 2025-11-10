import axios from "axios";

const token = localStorage.getItem('token');

export const solicitarColeta = (payload: {
  material: string;
  quantidade: number;
  endereco: string;
  observacoes?: string;
}) => {
  const token = localStorage.getItem('token'); // atualiza token sempre
  return axios.post("http://localhost:3001/collections", payload, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
};
