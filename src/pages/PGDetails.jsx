import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPGById, clearError } from "../features/pg/pgSlice";

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentPG, loading, error } = useSelector((state) => state.pg);

  useEffect(() => {
    if (id) {
      dispatch(fetchPGById(id));
    }
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading PG details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!currentPG) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600 mb-4">PG not found</div>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentPG.name}
            </h1>
            <p className="text-gray-600">{currentPG.location}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/edit-pg/${currentPG.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Edit PG
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* PG Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Name:</span>
              <span className="ml-2 text-gray-900">{currentPG.name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Location:</span>
              <span className="ml-2 text-gray-900">{currentPG.location}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Address:</span>
              <span className="ml-2 text-gray-900">{currentPG.address}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">City:</span>
              <span className="ml-2 text-gray-900">{currentPG.city}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">State:</span>
              <span className="ml-2 text-gray-900">{currentPG.state}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Price:</span>
              <span className="ml-2 text-gray-900">₹{currentPG.price}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Status:</span>
              <span
                className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                  currentPG.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {currentPG.status}
              </span>
            </div>
          </div>
        </div>

        {/* Description & Amenities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 mb-6">{currentPG.description}</p>

          <h3 className="text-lg font-semibold mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {currentPG.amenities &&
              currentPG.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {amenity}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Images */}
      {currentPG.images && currentPG.images.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentPG.images.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`PG Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Owner Information */}
      {currentPG.owner && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Owner Information</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Name:</span>
              <span className="ml-2 text-gray-900">{currentPG.owner.name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <span className="ml-2 text-gray-900">
                {currentPG.owner.email}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Phone:</span>
              <span className="ml-2 text-gray-900">
                {currentPG.owner.phone}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PGDetails;
