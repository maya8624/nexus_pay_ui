import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/apiClient";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => api.post("/auth/logout"),
    onSuccess: () => {
      // 1. Wipe Zustand
      clearAuth();
      
      // 2. Clear React Query cache (removes old user data)
      queryClient.clear();
      
      // 3. Go to login
      navigate("/login");
    },
    onError: () => {
      // Even if the server call fails, we usually wipe the local state anyway
      clearAuth();
      navigate("/login");
    }
  });
}