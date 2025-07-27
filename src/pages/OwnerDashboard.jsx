import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const summaryCards = [
    {
      title: "Total Properties",
      value: "8",
      icon: "🏠",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Occupied Rooms",
      value: "24",
      icon: "🛏️",
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Requests",
      value: "5",
      icon: "⏳",
      color: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Monthly Revenue",
      value: "₹45,000",
      icon: "💰",
      color: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
  ];

  const properties = [
    {
      id: 1,
      name: "Sunrise PG",
      location: "Koramangala, Bangalore",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      status: "Active",
      statusColor: "bg-green-500",
      occupied: "10/15",
    },
    {
      id: 2,
      name: "Elite Residency",
      location: "Bandra, Mumbai",
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
      status: "Pending",
      statusColor: "bg-yellow-500",
      occupied: "8/12",
    },
    {
      id: 3,
      name: "Green Valley PG",
      location: "Sector 62, Noida",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      status: "Active",
      statusColor: "bg-green-500",
      occupied: "12/18",
    },
  ];

  const bookingRequests = [
    {
      id: 1,
      applicant: "Priya Sharma",
      email: "priya@example.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80",
      property: "Sunrise PG",
      roomType: "Single Room",
      date: "Dec 10, 2024",
      status: "Pending",
      statusColor: "bg-orange-100 text-orange-700",
    },
    {
      id: 2,
      applicant: "Rahul Kumar",
      email: "rahul@example.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      property: "Elite Residency",
      roomType: "Double Sharing",
      date: "Dec 9, 2024",
      status: "Approved",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 3,
      applicant: "Anjali Gupta",
      email: "anjali@example.com",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      property: "Green Valley PG",
      roomType: "Triple Sharing",
      date: "Dec 8, 2024",
      status: "Pending",
      statusColor: "bg-orange-100 text-orange-700",
    },
  ];

  const handleAccept = (id) => {
    console.log("Accept booking request:", id);
    // Add accept logic here
  };

  const handleReject = (id) => {
    console.log("Reject booking request:", id);
    // Add reject logic here
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || "John"}!</p>
          <p className="text-gray-600">
            Here's an overview of your PG properties and recent activity.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
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
                d="M15 17h5l-5 5v-5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/add-new-pg")}
          >
            + Add New PG
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div
                className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}
              >
                <span className={`text-2xl ${card.iconColor}`}>
                  {card.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* My Properties */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Properties</h2>
            <p className="text-gray-600">Manage your PG accommodations.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-32 object-cover"
                />
                <span
                  className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium text-white rounded ${property.statusColor}`}
                >
                  {property.status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {property.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {property.location}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {property.occupied} Occupied
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Booking Requests */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Recent Booking Requests
            </h2>
            <p className="text-gray-600">
              Review and manage incoming requests.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Applicant
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Property
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Room Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <img
                        src={request.avatar}
                        alt={request.applicant}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {request.applicant}
                        </p>
                        <p className="text-sm text-gray-500">{request.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900">
                    {request.property}
                  </td>
                  <td className="py-4 px-4 text-gray-900">
                    {request.roomType}
                  </td>
                  <td className="py-4 px-4 text-gray-900">{request.date}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${request.statusColor}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
