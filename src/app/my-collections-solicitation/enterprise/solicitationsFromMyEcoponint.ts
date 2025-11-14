import axios from "../../utils/axios";

export default function solicitationsFromMyEcoponint(ecopointId: string) {
    return axios.get(`http://localhost:3001/request-collection/company/${ecopointId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });
}