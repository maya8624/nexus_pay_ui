import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../services/apiClient";
import { useAuthStore } from "../store/authStore";
import { OAuthSection } from "../components/OAuthSection";
import {
  FiUser,
  FiMail,
  FiLock,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setAuth, isAuthenticated } = useAuthStore();

  // 🛡️ Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated, navigate]);

  // 📡 Registration Mutation
  const registerMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (userData) => {
      setAuth(userData); // Save user to Zustand
      navigate("/products"); // Go to dashboard/products
    },
    onError: (err: any) => {
      const message =
        err.response?.data?.message || "Registration failed. Try again.";
      setError(message);
    },
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    registerMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Join NexusPay
          </h1>
          <p className="text-gray-500 mt-2">
            Create your account to start shopping
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl shadow-gray-100">
          {/* ❌ Error Alert */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl mb-6 text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
              <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* 🔑 Social Registration (Reused Component) */}
          <OAuthSection setError={setError} />

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
              <span className="px-4 bg-white text-gray-400">Or use email</span>
            </div>
          </div>

          {/* 📧 Email Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-300"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-300"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <FiCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 active:scale-[0.98] disabled:bg-blue-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 mt-4"
            >
              {registerMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
