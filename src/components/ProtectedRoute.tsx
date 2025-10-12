import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // Optional: for role-based access
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = !!localStorage.getItem("token"); // or use context / redux

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login
  }

  return children;
};

export default ProtectedRoute;
