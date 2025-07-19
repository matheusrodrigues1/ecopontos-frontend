import axios from "axios";

import { EcoPoint } from "@/app/types/ecopoints/ecopoints";

export const cadastrar = (payload: EcoPoint) => axios.post("http://localhost:3001/ecopoints", payload, {
    headers: {
        "Content-Type": "application/json"
    }
}
);