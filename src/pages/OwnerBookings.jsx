import React from "react";

const OwnerBookings = () => {
  // Mock booking requests data
  const bookings = [
    {
      id: 1,
      applicant: "Priya Sharma",
      pgName: "Sunrise PG",
      roomType: "Single Room",
      checkIn: "Dec 10, 2024",
      status: "Pending",
      statusColor: "bg-orange-100 text-orange-700",
    },
    {
      id: 2,
      applicant: "Rahul Kumar",
      pgName: "Elite Residency",
      roomType: "Double Sharing",
      checkIn: "Dec 9, 2024",
      status: "Approved",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 3,
      applicant: "Anjali Gupta",
      pgName: "Green Valley PG",
      roomType: "Triple Sharing",
      checkIn: "Dec 8, 2024",
      status: "Pending",
      statusColor: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings</h1>
        <p className="text-gray-600">
          Review and manage all booking requests for your PG properties.
        </p>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Applicant
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  PG Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Room Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Check-in
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
                    {booking.applicant}
                  </td>
                  <td className="py-4 px-4 text-gray-700">{booking.pgName}</td>
                  <td className="py-4 px-4 text-gray-700">
                    {booking.roomType}
                  </td>
                  <td className="py-4 px-4 text-gray-700">{booking.checkIn}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${booking.statusColor}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm mr-2">
                      Accept
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                      Reject
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

export default OwnerBookings;
