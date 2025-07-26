import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/footer";
import homeIcon from "../assets/Login/home-icon.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const userStats = {
    name: "John Doe",
    email: "john@example.com",
    totalBookings: 3,
    activeBookings: 1,
    savedPGs: 5,
  };

  const recentBookings = [
    {
      id: 1,
      pgName: "Sunrise PG",
      location: "Koramangala, Bangalore",
      status: "Active",
      checkIn: "2024-01-15",
      amount: "₹12,000",
    },
    {
      id: 2,
      pgName: "Elite Residency",
      location: "Bandra, Mumbai",
      status: "Completed",
      checkIn: "2023-12-01",
      amount: "₹15,500",
    },
  ];

  const quickActions = [
    {
      title: "Find PG",
      description: "Search for new accommodations",
      icon: "🏠",
      link: "/search",
    },
    {
      title: "My Bookings",
      description: "View all your bookings",
      icon: "📋",
      link: "/bookings",
    },
    {
      title: "Saved PGs",
      description: "Your favorite accommodations",
      icon: "❤️",
      link: "/saved",
    },
    {
      title: "Profile",
      description: "Update your information",
      icon: "👤",
      link: "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {userStats.name}! 👋
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your PG accommodations
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <img
                src={homeIcon}
                alt="PGFinder"
                className="w-8 h-8"
                style={{ width: 27, height: 29 }}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats.totalBookings}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats.activeBookings}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Saved PGs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats.savedPGs}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{action.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Bookings
            </h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {booking.pgName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {booking.location}
                      </p>
                      <p className="text-sm text-gray-500">
                        Check-in: {booking.checkIn}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          booking.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {booking.amount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/bookings"
                className="text-blue-600 hover:text-blue-500 font-medium text-sm"
              >
                View All Bookings →
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
