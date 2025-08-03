import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, userRole } = useSelector((state) => state.auth);

  console.log("Dashboard component rendered");
  console.log("Dashboard - user:", user);
  console.log("Dashboard - userRole:", userRole);

  const userStats = [
    {
      title: "Active Bookings",
      value: "2",
      icon: "📋",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "+1",
      changeColor: "text-green-600",
    },
    {
      title: "Saved PGs",
      value: "8",
      icon: "❤️",
      color: "bg-red-100",
      iconColor: "text-red-600",
      change: "+2",
      changeColor: "text-green-600",
    },
    {
      title: "Reviews Given",
      value: "5",
      icon: "⭐",
      color: "bg-yellow-100",
      iconColor: "text-yellow-600",
      change: "+1",
      changeColor: "text-green-600",
    },
    {
      title: "Total Spent",
      value: "₹45,000",
      icon: "💰",
      color: "bg-green-100",
      iconColor: "text-green-600",
      change: "+₹8,000",
      changeColor: "text-green-600",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      pgName: "Sunrise PG",
      location: "Koramangala, Bangalore",
      checkIn: "Dec 15, 2024",
      checkOut: "Jan 15, 2025",
      amount: "₹12,000",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 2,
      pgName: "Elite Residency",
      location: "Bandra, Mumbai",
      checkIn: "Jan 1, 2025",
      checkOut: "Feb 1, 2025",
      amount: "₹15,000",
      status: "Upcoming",
      statusColor: "bg-blue-100 text-blue-700",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 3,
      pgName: "Green Valley PG",
      location: "Sector 62, Noida",
      checkIn: "Nov 1, 2024",
      checkOut: "Dec 1, 2024",
      amount: "₹10,000",
      status: "Completed",
      statusColor: "bg-gray-100 text-gray-700",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop&crop=center",
    },
  ];

  const quickActions = [
    {
      title: "Find New PG",
      description: "Search for available accommodations",
      icon: "🔍",
      color: "bg-blue-500",
      link: "/search",
    },
    {
      title: "View Bookings",
      description: "Check your booking history",
      icon: "📋",
      color: "bg-green-500",
      link: "/bookings",
    },
    {
      title: "Saved PGs",
      description: "Your favorite accommodations",
      icon: "❤️",
      color: "bg-red-500",
      link: "/saved",
    },
    {
      title: "Update Profile",
      description: "Manage your account details",
      icon: "👤",
      color: "bg-purple-500",
      link: "/profile",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Booked a room at Sunrise PG",
      time: "2 hours ago",
      icon: "📅",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      action: "Added Elite Residency to favorites",
      time: "1 day ago",
      icon: "❤️",
      color: "bg-red-100 text-red-600",
    },
    {
      id: 3,
      action: "Left a review for Green Valley PG",
      time: "3 days ago",
      icon: "⭐",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 4,
      action: "Updated profile information",
      time: "1 week ago",
      icon: "👤",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const recommendations = [
    {
      id: 1,
      name: "Cosy Corner PG",
      location: "Indiranagar, Bangalore",
      price: "₹8,500",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=100&fit=crop&crop=center",
      amenities: ["WiFi", "AC", "Food"],
    },
    {
      id: 2,
      name: "Student Haven",
      location: "HSR Layout, Bangalore",
      price: "₹7,200",
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=100&fit=crop&crop=center",
      amenities: ["WiFi", "Laundry", "Study Room"],
    },
    {
      id: 3,
      name: "Premium Residency",
      location: "Whitefield, Bangalore",
      price: "₹12,000",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=100&fit=crop&crop=center",
      amenities: ["WiFi", "AC", "Gym", "Food"],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name || "User"}! 👋
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your PG accommodations today.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <span className={`text-sm font-medium ${stat.changeColor}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white`}
                >
                  <span className="text-lg">{action.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Bookings
              </h2>
              <p className="text-gray-600">Your latest PG accommodations</p>
            </div>
            <Link
              to="/bookings"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <img
                  src={booking.image}
                  alt={booking.pgName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {booking.pgName}
                  </h3>
                  <p className="text-sm text-gray-600">{booking.location}</p>
                  <p className="text-sm text-gray-500">
                    {booking.checkIn} - {booking.checkOut}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {booking.amount}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
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

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center`}
                >
                  <span className="text-sm">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Recommended for You
            </h2>
            <p className="text-gray-600">
              Based on your preferences and location
            </p>
          </div>
          <Link
            to="/search"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((pg) => (
            <div
              key={pg.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={pg.image}
                alt={pg.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{pg.name}</h3>
                  <span className="text-lg font-bold text-blue-600">
                    {pg.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{pg.location}</p>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {pg.rating}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {pg.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
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
