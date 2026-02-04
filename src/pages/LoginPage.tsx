import { useState } from "react";
import { Link } from "react-router-dom";
import { OAuthSection } from "../components/OAuthSection";
import { EmailLoginForm } from "../components/EmailLoginForm";

export default function LoginPage() {
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Nexus Pay</h1>
          <p className="text-gray-500 mt-1">Choose your secure login method</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          {/* Error Alert */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-5 text-sm text-red-600 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Social Logins */}
          <OAuthSection setError={setError} />

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative px-4 bg-white text-gray-400 text-xs uppercase tracking-wider">
              or
            </span>
          </div>

          {/* Standard Login */}
          <EmailLoginForm setError={setError} />

          {/* Footer */}
          <div className="mt-8 text-center text-sm">
            <p className="text-gray-500">
              New here?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
