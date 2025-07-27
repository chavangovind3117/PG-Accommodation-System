import React from "react";
import { useNavigate } from "react-router-dom";

const OwnerPGs = () => {
  const navigate = useNavigate();
  // Mock PGs data
  const pgs = [
    {
      id: 1,
      name: "Sunrise PG",
      location: "Koramangala, Bangalore",
      totalRooms: 15,
      occupied: 10,
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      name: "Elite Residency",
      location: "Bandra, Mumbai",
      totalRooms: 12,
      occupied: 8,
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 3,
      name: "Green Valley PG",
      location: "Sector 62, Noida",
      totalRooms: 18,
      occupied: 12,
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My PGs</h1>
          <p className="text-gray-600">
            Here are all the PG properties you manage as an owner.
          </p>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/add-new-pg")}
        >
          + Add New PG
        </button>
      </div>

      {/* PGs Table */}
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
                  Total Rooms
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Occupied
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
              {pgs.map((pg) => (
                <tr key={pg.id} className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-900 font-semibold">
                    {pg.name}
                  </td>
                  <td className="py-4 px-4 text-gray-700">{pg.location}</td>
                  <td className="py-4 px-4 text-gray-700">{pg.totalRooms}</td>
                  <td className="py-4 px-4 text-gray-700">{pg.occupied}</td>
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
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                      Delete
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

export default OwnerPGs;
