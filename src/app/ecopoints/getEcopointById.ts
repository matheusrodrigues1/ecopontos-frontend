import axios from "../utils/axios";

export default async function getEcopointById(id: string) {
    try {
        const res = await axios.get(`http://localhost:3001/ecopoints/${id}`);
        console.log(res);
        return res.data;
    } catch (err) {
        console.error("Erro ao buscar ecopoint por id:", err);
        return null;
    }
}
