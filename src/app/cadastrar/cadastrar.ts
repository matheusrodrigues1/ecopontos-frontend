import axios from "axios";

export const cadastrar = (payload: any) => axios.post("http://localhost:3001/ecopoints", payload, {
    headers: {
        "Content-Type": "application/json"
    }
}
);