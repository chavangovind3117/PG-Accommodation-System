import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/footer";
import homeIcon from "../assets/Login/home-icon.png";
import { Link, useSearchParams } from "react-router-dom";

const Error = () => {
  const [searchParams] = useSearchParams();
  const errorType = searchParams.get("type") || "general";
  const errorMessage = searchParams.get("message") || "Something went wrong";

  const errorConfig = {
    general: {
      title: "Oops! Something went wrong",
      description:
        "We're sorry, but something unexpected happened. Please try again.",
      icon: "😕",
      color: "bg-red-100",
      iconColor: "text-red-600",
    },
    token_expired: {
      title: "Link Expired",
      description:
        "The link you clicked has expired. Please request a new one.",
      icon: "⏰",
      color: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    invalid_token: {
      title: "Invalid Link",
      description: "The link you clicked is invalid or has already been used.",
      icon: "❌",
      color: "bg-red-100",
      iconColor: "text-red-600",
    },
    not_found: {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
      icon: "🔍",
      color: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    unauthorized: {
      title: "Access Denied",
      description: "You don't have permission to access this page.",
      icon: "🚫",
      color: "bg-red-100",
      iconColor: "text-red-600",
    },
  };

  const config = errorConfig[errorType] || errorConfig.general;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          {/* Branding Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <img
                  src={homeIcon}
                  alt="PGFinder"
                  className="w-8 h-8"
                  style={{ width: 27, height: 29 }}
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
            <p className="text-gray-600">Something went wrong</p>
          </div>

          {/* Error Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center space-y-4">
              <div
                className={`w-16 h-16 ${config.color} rounded-full flex items-center justify-center mx-auto`}
              >
                <span className={`text-3xl ${config.iconColor}`}>
                  {config.icon}
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {config.title}
              </h3>
              <p className="text-gray-600">{config.description}</p>

              {errorMessage && errorMessage !== "Something went wrong" && (
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{errorMessage}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link
                  to="/"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors text-center"
                >
                  Go Home
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors"
                >
                  Go Back
                </button>
              </div>

              {/* Additional Help */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Need help?</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    to="/contact"
                    className="text-blue-600 hover:text-blue-500 font-medium text-sm"
                  >
                    Contact Support
                  </Link>
                  <span className="text-gray-400 hidden sm:inline">•</span>
                  <Link
                    to="/help"
                    className="text-blue-600 hover:text-blue-500 font-medium text-sm"
                  >
                    Help Center
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error;
