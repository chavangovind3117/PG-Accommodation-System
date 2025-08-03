import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRedirect = () => {
  const { userRole, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    console.log("RoleBasedRedirect - useEffect triggered");
    console.log("RoleBasedRedirect - isAuthenticated:", isAuthenticated);
    console.log("RoleBasedRedirect - userRole:", userRole);
    console.log("RoleBasedRedirect - user:", user);
    console.log("RoleBasedRedirect - location.pathname:", location.pathname);
    console.log("RoleBasedRedirect - hasRedirected:", hasRedirected);

    if (isAuthenticated && location.pathname === "/" && !hasRedirected) {
      // Try to get role from multiple sources
      const role = userRole || user?.role || "user";
      console.log("RoleBasedRedirect - final role:", role);

      const targetPath =
        role?.toLowerCase() === "owner" ? "/owner-dashboard" : "/dashboard";
      console.log("RoleBasedRedirect - redirecting to:", targetPath);

      setHasRedirected(true);
      navigate(targetPath, { replace: true });
    }
  }, [isAuthenticated, userRole, user, navigate, location, hasRedirected]);

  // Add a debug log to see what component is being rendered
  console.log("RoleBasedRedirect component rendered");

  return null;
};

export default RoleBasedRedirect;
