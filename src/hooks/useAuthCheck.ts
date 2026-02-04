import {useQuery} from "@tanstack/react-query";
import api from "../services/apiClient";
import type {User} from "../types/user";
import {useAuthStore} from "../store/authStore";
import { useEffect } from "react";

const useAuthCheck = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const query = useQuery({
        queryKey: ["auth", "me"],
        queryFn: async () => {
            const {data} = await api.get<User>("/auth/me");
            return data;
        },
        retry: false,
        staleTime: Infinity,
    });
  
    useEffect(() => {
        if (query.isSuccess) {
            setAuth(query.data);
        }

        if (query.isError) {
            // Handle onError logic here
            clearAuth(); 
            console.error("Session expired or invalid");
        }
    }, [query.isSuccess, query.isError, query.data, setAuth, clearAuth]);

  return query;
}

export default useAuthCheck