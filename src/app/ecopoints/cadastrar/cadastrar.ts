import axios from "axios";

import { EcoPoint } from "@/app/types/ecopoints/ecopoints";

const token = localStorage.getItem('token');

export const cadastrar = (payload: EcoPoint) => axios.post("http://localhost:3001/ecopoints", payload, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}
);