import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole?.toLowerCase())) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = userRole?.toLowerCase() === "owner" ? "/owner-dashboard" : "/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default RoleBasedRoute; 