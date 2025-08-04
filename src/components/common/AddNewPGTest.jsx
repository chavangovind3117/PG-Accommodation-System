import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPG } from "../../features/pg/pgSlice";

const AddNewPGTest = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [testResult, setTestResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testCreatePG = async () => {
    setLoading(true);
    setTestResult("Testing PG creation...");

    try {
      // Test data that matches backend structure
      const testPGData = {
        name: "Test PG Accommodation",
        location: "Test Location, Test City",
        description: "This is a test PG for API testing purposes",
        price: 8500.0,
        address: "123 Test Street, Test Area",
        city: "Test City",
        state: "Test State",
        amenities: ["Free WiFi", "AC Rooms", "Parking"],
        rating: 0.0,
        reviewCount: 0,
        status: "ACTIVE",
        ownerId: user?.id, // Include owner ID
      };

      console.log("Test PG Data:", testPGData);
      console.log("User ID:", user?.id);

      const result = await dispatch(
        createPG({
          pgData: testPGData,
          images: [],
        })
      ).unwrap();

      setTestResult(
        `✅ Success! PG created with ID: ${result.pg?.id || "Unknown"}`
      );
      console.log("Create PG Result:", result);
    } catch (error) {
      console.error("Test failed:", error);
      setTestResult(`❌ Failed: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const testFormValidation = () => {
    const testData = {
      name: "Test PG",
      location: "Test Location",
      price: 5000,
      address: "Test Address",
      city: "Test City",
      state: "Test State",
      amenities: ["WiFi"],
      photos: [],
    };

    // Simulate form validation
    const errors = [];

    if (!testData.name) errors.push("PG name is required");
    if (!testData.location) errors.push("Location is required");
    if (!testData.price || testData.price <= 0)
      errors.push("Valid price is required");
    if (!testData.address) errors.push("Address is required");
    if (!testData.city) errors.push("City is required");
    if (!testData.state) errors.push("State is required");
    if (testData.amenities.length === 0)
      errors.push("At least one amenity is required");
    if (testData.photos.length < 3)
      errors.push("At least 3 photos are required");

    if (errors.length === 0) {
      setTestResult("✅ Form validation passed");
    } else {
      setTestResult(`❌ Validation errors: ${errors.join(", ")}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">AddNewPG Form Test</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Current User Info:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={testFormValidation}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            Test Form Validation
          </button>

          <button
            onClick={testCreatePG}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Testing..." : "Test Create PG"}
          </button>
        </div>

        {testResult && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <pre className="text-sm">{testResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewPGTest;
