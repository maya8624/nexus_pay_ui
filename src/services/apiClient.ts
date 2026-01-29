import axios from "axios";
import { config } from "../config/config";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: config.apiBaseUrl, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // auto-logout if unauthorized
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
