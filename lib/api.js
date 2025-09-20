import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000",
    headers: { "Content-Type": "application/json" },
});

export default api;

export function qs(params = {}) {
    const u = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "" && !Number.isNaN(v)) u.append(k, v);
    });
    const s = u.toString();
    return s ? `?${s}` : "";
}
