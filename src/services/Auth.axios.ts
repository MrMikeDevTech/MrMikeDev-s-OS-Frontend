import axios from "axios";
import { API_BASE_URL, API_KEY } from "../data";

const authApi = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }
});

authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export { authApi };
