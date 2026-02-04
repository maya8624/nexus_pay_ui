import axios from "axios";
import config from "../config/config";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: config.apiBaseUrl, 
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If any request returns 401, wipe the store!
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  }
);

export default api;
