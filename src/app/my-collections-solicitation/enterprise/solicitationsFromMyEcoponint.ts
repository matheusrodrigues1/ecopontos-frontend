import axios from "../../utils/axios";

export default function solicitationsFromMyEcoponint(companyId?: string) {
    // Prefer explicit companyId param, fallback to localStorage / stored user
    let resolvedCompanyId = companyId;
    if (!resolvedCompanyId) {
        try {
            resolvedCompanyId = localStorage.getItem("companyId") || undefined;
            if (!resolvedCompanyId) {
                const userStr = localStorage.getItem("user");
                if (userStr) {
                    const user = JSON.parse(userStr);
                    resolvedCompanyId = user && (user.companyId || user.id || user._id || user.userId) || undefined;
                }
            }
        } catch (e) {
            resolvedCompanyId = undefined;
        }
    }

    if (!resolvedCompanyId) {
        // If we still don't have a companyId, call will likely fail — return a rejected promise
        return Promise.reject(new Error("companyId not available"));
    }

    // Use the axios instance (which already injects Authorization header)
    return axios.get(`http://localhost:3001/request-collection/company/${resolvedCompanyId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        },
    });
}