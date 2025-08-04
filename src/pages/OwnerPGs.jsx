import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllPGs, clearError } from "../features/pg/pgSlice";

const OwnerPGs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pgs, loading, error } = useSelector((state) => state.pg);
  const { user } = useSelector((state) => state.auth);

  // Fetch owner's PGs on component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllPGs({ ownerId: user.id }));
    }
  }, [dispatch, user?.id]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

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

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          Loading your PGs...
        </div>
      )}

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
                  Price
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  City
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
              {pgs.length === 0 && !loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-8 px-4 text-center text-gray-500"
                  >
                    No PGs found. Add your first PG to get started!
                  </td>
                </tr>
              ) : (
                pgs.map((pg) => (
                  <tr key={pg.id} className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-900 font-semibold">
                      {pg.name}
                    </td>
                    <td className="py-4 px-4 text-gray-700">{pg.location}</td>
                    <td className="py-4 px-4 text-gray-700">
                      {pg.price ? `₹${pg.price}` : "N/A"}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {pg.city || "N/A"}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          pg.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {pg.status || "PENDING"}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerPGs;
