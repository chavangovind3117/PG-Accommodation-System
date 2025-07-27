import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const userStats = [
    {
      title: "My Bookings",
      value: "3",
      icon: "📋",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Saved PGs",
      value: "8",
      icon: "❤️",
      color: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Reviews Given",
      value: "5",
      icon: "⭐",
      color: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Total Spent",
      value: "₹45,000",
      icon: "💰",
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      pgName: "Sunrise PG",
      location: "Koramangala, Bangalore",
      checkIn: "Dec 15, 2024",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      pgName: "Elite Residency",
      location: "Bandra, Mumbai",
      checkIn: "Jan 1, 2025",
      status: "Upcoming",
      statusColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      pgName: "Green Valley PG",
      location: "Sector 62, Noida",
      checkIn: "Nov 1, 2024",
      status: "Completed",
      statusColor: "bg-gray-100 text-gray-700",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your PG bookings and activities.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <span className={`text-2xl ${stat.iconColor}`}>
                  {stat.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <p className="text-gray-600">Your latest PG accommodations</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {booking.pgName}
                </h3>
                <p className="text-sm text-gray-600">{booking.location}</p>
                <p className="text-sm text-gray-500">
                  Check-in: {booking.checkIn}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${booking.statusColor}`}
                >
                  {booking.status}
                </span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
