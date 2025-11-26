import axios from "../../utils/axios";

export type SolicitarPayload = {
  ecopointId: string;
  quantity: number;
  material: string;
  address: string;
  description?: string;
};

export const solicitarColeta = (payload: SolicitarPayload) => {
  const body = {
    ecopointId: payload.ecopointId,
    quantity: payload.quantity,
    material: payload.material,
    address: payload.address,
    description: payload.description || "",
  };

  return axios.post("http://localhost:3001/request-collection", body, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  });
};
