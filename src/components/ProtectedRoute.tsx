import { getRole } from "@/utils/localStorage";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // Optional: for role-based access
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const role = getRole();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login
  }

  if (!role || !allowedRoles?.includes(role)) {
    return <Navigate to="/" replace />; // Redirect if role not allowed
  }

  return <>{children}</>;
};

export default ProtectedRoute;
