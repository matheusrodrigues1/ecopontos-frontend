import { EcoPoint, EcopointPayload } from "@/app/types/ecopoints/ecopoints";
import axios from "axios";

export const editarEcoponto = async (ecopoint: EcoPoint, payload: EcopointPayload) => {
    const token = localStorage.getItem('token');

    const response = await axios.patch(`http://localhost:3001/ecopoints/${ecopoint.id}`, payload, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response.data;
}