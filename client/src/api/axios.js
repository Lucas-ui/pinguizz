import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost/api";

const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken");
  const isAdmin = sessionStorage.getItem("isAdmin");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.role = isAdmin;
  }
  return config;
});

export default apiClient;
