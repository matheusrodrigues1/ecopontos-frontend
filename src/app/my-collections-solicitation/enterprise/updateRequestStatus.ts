import axios from "../../utils/axios";

export default function updateRequestStatus(requestId: string, status: string) {
    return axios.patch(`http://localhost:3001/request-collection/${requestId}/status`, { status },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
}
