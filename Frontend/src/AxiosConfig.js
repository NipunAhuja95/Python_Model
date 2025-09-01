// src/axiosConfig.js
import axios from "axios";

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("[AxiosConfig] Attached token to request:", token);
        } else {
            console.warn("[AxiosConfig] No token found");
        }
        return config;
    },
    (error) => Promise.reject(error)
);
