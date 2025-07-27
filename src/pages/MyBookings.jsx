import React from "react";
// import { useSelector } from "react-redux";

const MyBookings = () => {
  // const { user } = useSelector((state) => state.auth);

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      pgName: "Sunrise PG",
      location: "Koramangala, Bangalore",
      checkIn: "Dec 15, 2024",
      duration: "3 Months",
      roomType: "Single Room",
      price: 12000,
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      pgName: "Elite Residency",
      location: "Bandra, Mumbai",
      checkIn: "Jan 1, 2025",
      duration: "6 Months",
      roomType: "Double Sharing",
      price: 10000,
      status: "Upcoming",
      statusColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      pgName: "Green Valley PG",
      location: "Sector 62, Noida",
      checkIn: "Nov 1, 2024",
      duration: "1 Month",
      roomType: "Triple Sharing",
      price: 8000,
      status: "Completed",
      statusColor: "bg-gray-100 text-gray-700",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">
          Here are all your current and past PG bookings.
        </p>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  PG Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Location
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Check-in
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Duration
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Room Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Monthly Rent
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
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-900 font-semibold">
                    {booking.pgName}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {booking.location}
                  </td>
                  <td className="py-4 px-4 text-gray-700">{booking.checkIn}</td>
                  <td className="py-4 px-4 text-gray-700">
                    {booking.duration}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {booking.roomType}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    ₹{booking.price.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${booking.statusColor}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      View Details
                    </button>
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

export default MyBookings;
