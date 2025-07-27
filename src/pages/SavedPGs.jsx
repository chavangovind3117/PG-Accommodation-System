import React from "react";

const SavedPGs = () => {
  // Mock saved PGs data
  const savedPGs = [
    {
      id: 1,
      pgName: "Sunrise PG",
      location: "Koramangala, Bangalore",
      price: 12000,
      roomType: "Single Room",
      rating: 4.5,
      status: "Available",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      pgName: "Elite Residency",
      location: "Bandra, Mumbai",
      price: 10000,
      roomType: "Double Sharing",
      rating: 4.2,
      status: "Few Rooms Left",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 3,
      pgName: "Green Valley PG",
      location: "Sector 62, Noida",
      price: 8000,
      roomType: "Triple Sharing",
      rating: 4.0,
      status: "Full",
      statusColor: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved PGs</h1>
        <p className="text-gray-600">
          Here are all the PGs you have saved for future reference.
        </p>
      </div>

      {/* Saved PGs Table */}
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
                  Room Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Monthly Rent
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Rating
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
              {savedPGs.map((pg) => (
                <tr key={pg.id} className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-900 font-semibold">
                    {pg.pgName}
                  </td>
                  <td className="py-4 px-4 text-gray-700">{pg.location}</td>
                  <td className="py-4 px-4 text-gray-700">{pg.roomType}</td>
                  <td className="py-4 px-4 text-gray-700">
                    ₹{pg.price.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-gray-700">{pg.rating} ★</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${pg.statusColor}`}
                    >
                      {pg.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm mr-2">
                      View
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                      Remove
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

export default SavedPGs;
