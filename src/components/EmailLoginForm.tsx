import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useMutation } from "@tanstack/react-query";
import api from "../services/apiClient";
import type { User } from "../types/user";

interface Props {
  setError: (msg: string) => void;
}

export function EmailLoginForm({ setError }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  // React Query Mutation for Login
  const loginMutation = useMutation({
    mutationFn: async () => {
      // Hits your future .NET endpoint: [HttpPost("login")]
      const { data } = await api.post<User>("/auth/login", { email, password });
      return data;
    },
    onSuccess: (userData) => {
      setAuth(userData); // Update Zustand Store
      navigate("/products");
    },
    onError: (err: any) => {
      // Backend returns 401? Show "Invalid credentials"
      const message =
        err.response?.data?.message || "Invalid email or password";
      setError(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex justify-center items-center gap-2"
      >
        {loginMutation.isPending && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {loginMutation.isPending ? "Signing in..." : "Sign in with Email"}
      </button>
    </form>
  );
}
