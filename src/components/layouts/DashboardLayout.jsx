import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/footer";

const DashboardLayout = () => {
  const location = useLocation();
  const { user, userRole } = useSelector((state) => state.auth);

  // Determine if current route is a dashboard route
  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/owner-dashboard") ||
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/bookings") ||
    location.pathname.startsWith("/saved") ||
    location.pathname.startsWith("/search") ||
    location.pathname.startsWith("/add-new-pg") ||
    location.pathname.startsWith("/owner-properties") ||
    location.pathname.startsWith("/owner-bookings");

  // If not a dashboard route, render without sidebar
  if (!isDashboardRoute) {
    return <Outlet />;
  }

  // User sidebar navigation items
  const userNavItems = [
    {
      name: "Home",
      path: "/home",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      name: "Find PGs",
      path: "/search",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "My Bookings",
      path: "/bookings",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "Saved PGs",
      path: "/saved",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      ),
    },
    {
      name: "Profile",
      path: "/profile",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  // Owner sidebar navigation items
  const ownerNavItems = [
    {
      name: "Home",
      path: "/home",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      name: "My PGs",
      path: "/owner-properties",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Add New PG",
      path: "/add-new-pg",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Bookings",
      path: "/owner-bookings",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "Profile",
      path: "/profile",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  console.log("DashboardLayout - userRole:", userRole);
  const navItems =
    userRole?.toLowerCase() === "owner" ? ownerNavItems : userNavItems;
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg flex flex-col h-screen">
          <div className="p-6 flex-1">
            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase() ||
                    (userRole?.toLowerCase() === "owner" ? "O" : "U")}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {user?.name ||
                    (userRole?.toLowerCase() === "owner" ? "Owner" : "User")}
                </p>
                <p className="text-sm text-gray-500">
                  {userRole?.toLowerCase() === "owner"
                    ? "Property Owner"
                    : "PG Seeker"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
