import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface Props {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const token = useAuthStore((s) => s.token);
  const location = useLocation();

  // If not logged in, redirect to /login
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in → show children
  return children;
};

export default AuthGuard;
