import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Mock authentication check - replace with actual auth logic
  // In a real app, this would come from Redux, Context, or localStorage
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true" || false;
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
