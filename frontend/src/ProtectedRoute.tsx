// src/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole) {
    const userRole = localStorage.getItem("role");
    if (userRole !== requiredRole) {
      // If role does not match, redirect to unauthorized page
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
