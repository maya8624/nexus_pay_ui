import { useState } from "react";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import api from "../services/apiClient";
import type { LoginRequest } from "../types/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import type { User } from "../types/user";

interface Props {
  setError: (msg: string) => void;
}

export function OAuthSection({ setError }: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setAuth = useAuthStore((state) => state.setAuth);

  // 📡 Unified Backend Handshake
  const syncWithBackend = async (data: LoginRequest) => {
    try {
      setLoading(data.provider);

      const response = await api.post<User>("/auth/external-login", data);

      // Update Zustand immediately with the backed response
      // This makes the UI "snapy" so the Navar updates before the redirect
      setAuth(response.data);
      console.log(`${data.provider} success:`, response.data);

      // Keep the existing quey logic
      await queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });

      navigate("/products");
    } catch (err) {
      setError(`${data.provider} login failed to sync with server.`);
    } finally {
      setLoading(null);
    }
  };

  // 🔑 Google Flow
  const googleLogin = useGoogleLogin({
    onSuccess: (token) =>
      syncWithBackend({
        idToken: token.access_token,
        provider: "google",
      }),
    onError: () => setError("Google popup blocked or closed."),
  });

  return (
    <div className="space-y-3">
      {/* GOOGLE */}

      {/* 🔵 GOOGLE BUTTON (PREVIOUS DESIGN) */}
      <div className="relative h-[50px] w-full">
        {/* Your Original Tailwind Button */}
        <button
          type="button"
          className="absolute inset-0 w-full h-full py-3 px-4 bg-white border border-gray-300 rounded-xl flex items-center justify-center gap-3 font-medium text-gray-700 transition-all pointer-events-none"
        >
          {loading === "google" ? (
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          Continue with Google
        </button>

        {/* Invisible Google Component Overlay */}
        <div className="absolute inset-0 w-full h-full opacity-0 overflow-hidden cursor-pointer">
          <GoogleLogin
            onSuccess={(res) => {
              syncWithBackend({
                idToken: res.credential || "",
                provider: "google",
              });
            }}
            onError={() => setError("Google login failed.")}
            // We set the width large enough to cover your button
            width="400"
          />
        </div>
      </div>

      {/* MICROSOFT (Placeholder) */}
      <button
        onClick={() => setError("Microsoft login coming soon!")}
        className="w-full py-3 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-3 font-medium text-gray-700"
      >
        <MicrosoftIcon /> Continue with Microsoft
      </button>
      {/* 🍎 Apple Button (Restored!) */}
      <button
        onClick={() =>
          setError("Apple Login requires a production domain and HTTPS.")
        }
        disabled={!!loading}
        className="w-full py-3 px-4 bg-black text-white border border-black rounded-xl hover:bg-gray-900 disabled:bg-gray-600 flex items-center justify-center gap-3 font-medium transition-all"
      >
        <AppleIcon />
        Continue with Apple
      </button>
    </div>
  );
}

// Simple Icon Components to keep the main code clean
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const MicrosoftIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 23 23">
    <path fill="#f35325" d="M1 1h10v10H1z" />
    <path fill="#81bc06" d="M12 1h10v10H12z" />
    <path fill="#05a6f0" d="M1 12h10v10H1z" />
    <path fill="#ffba08" d="M12 12h10v10H12z" />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);
