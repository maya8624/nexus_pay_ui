import { create } from "zustand";
import type { User } from "../types/user";

// Defainng the shape of our auth store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialLoading: boolean; // for the "checking auth" splash screen

  setAuth:(user: User) => void;
  clearAuth: () => void;
  finishInitialLoad: () => void;
}

// Create the auth store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialLoading: true,

  setAuth: (user) => set({ 
    user, 
    isAuthenticated: true, 
    isInitialLoading: false 
  }),

  clearAuth: () => set({ 
    user: null, 
    isAuthenticated: false,
    isInitialLoading: false
  }),

  finishInitialLoad: () => set({ isInitialLoading: false }),
}));
  