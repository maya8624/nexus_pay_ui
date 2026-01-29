import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN"
};


type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // Fake delay to simulate API
        await new Promise((res) => setTimeout(res, 800));

        // Fake credential check
        if (email !== "test@domain.dev" || password !== "1234") {
          throw new Error("Invalid credentials");
        }

        set({
          user: {
            id: "user1",
            email,
            name: "Test User",
            role: "USER",
          },
          token: "fake.jwt.from.backend",
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
