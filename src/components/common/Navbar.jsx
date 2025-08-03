import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import heroIcon from "../../assets/Home/hero-icon.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Get authentication state from Redux
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.auth
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setUserDropdownOpen(false);
    navigate("/home");
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Find PG", path: "/search" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow rounded-t-lg px-4 md:px-8 py-3 flex items-center justify-between relative">
      {/* Left: Logo */}
      <Link to="/home" className="flex items-center">
        <img
          src={heroIcon}
          alt="PGFinder"
          className="w-6 h-6 mr-2"
          style={{ width: 24, height: 24 }}
        />
        <span className="font-bold text-lg text-gray-900 pb-2">PGFinder</span>
      </Link>

      {/* Hamburger (mobile) */}
      <button
        className="md:hidden flex items-center px-2 py-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Center + Right: Nav Links (desktop) */}
      <div className="hidden md:flex flex-1 items-center justify-between">
        <div className="flex space-x-8 mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-medium transition-colors ${
                isActiveLink(link.path)
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md font-medium transition-colors border focus:outline-none ${
                  isActiveLink("/login")
                    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-4 py-2 rounded-md font-medium transition-colors border focus:outline-none ${
                  isActiveLink("/signup")
                    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* User Profile Dropdown */}
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="hidden lg:block font-medium">{user.name}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                  </div>
                  <Link
                    to={
                      userRole === "owner" ? "/owner-dashboard" : "/dashboard"
                    }
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md rounded-b-lg z-50 flex flex-col items-center md:hidden">
          {/* Navigation Links */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`py-3 w-full text-center border-b border-gray-100 ${
                isActiveLink(link.path)
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Authentication Section */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className={`py-3 w-full text-center border-b border-gray-100 px-4 rounded-md font-medium border focus:outline-none transition-colors ${
                  isActiveLink("/login")
                    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`my-3 w-full text-center px-4 py-2 rounded-md font-medium border focus:outline-none transition-colors border-b border-gray-100 ${
                  isActiveLink("/signup")
                    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="w-full">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* User Menu Items */}
              <Link
                to={userRole === "owner" ? "/owner-dashboard" : "/dashboard"}
                className="block py-3 px-4 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left py-3 px-4 text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
