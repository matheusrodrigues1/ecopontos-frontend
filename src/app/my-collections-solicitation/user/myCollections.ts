import axios from "../../utils/axios";

export default function myCollectionsUser(userId: string) {
    return axios.get(`http://localhost:3001/request-collection/user/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });
}