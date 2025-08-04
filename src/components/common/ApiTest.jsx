import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllPGs, createPG } from "../../features/pg/pgSlice";
import { useApiOperation } from "../../hooks/useApi";
import pgService from "../../services/pgService";

const ApiTest = () => {
  const dispatch = useDispatch();
  const [testResult, setTestResult] = useState("");

  // Test basic API connectivity
  const testBasicApi = async () => {
    try {
      const response = await pgService.getAllPGs();
      setTestResult(`✅ Basic API Test: Success! Found ${response.length} PGs`);
    } catch (error) {
      setTestResult(`❌ Basic API Test: Failed - ${error.message}`);
    }
  };

  // Test PG creation
  const testCreatePG = async () => {
    try {
      const testPGData = {
        name: "Test PG",
        location: "Test Location",
        description: "Test Description",
        price: 5000,
        address: "Test Address",
        city: "Test City",
        state: "Test State",
        amenities: ["WiFi", "AC"],
        ownerId: 1,
        status: "ACTIVE",
      };

      const result = await dispatch(
        createPG({ pgData: testPGData, images: [] })
      ).unwrap();
      setTestResult(
        `✅ Create PG Test: Success! Created PG with ID: ${result.pg?.id}`
      );
    } catch (error) {
      setTestResult(`❌ Create PG Test: Failed - ${error}`);
    }
  };

  // Test Redux integration
  const testReduxIntegration = async () => {
    try {
      const result = await dispatch(fetchAllPGs()).unwrap();
      setTestResult(
        `✅ Redux Integration Test: Success! Fetched ${result.length} PGs`
      );
    } catch (error) {
      setTestResult(`❌ Redux Integration Test: Failed - ${error}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">API Connection Test</h2>

      <div className="space-y-4">
        <button
          onClick={testBasicApi}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Basic API
        </button>

        <button
          onClick={testCreatePG}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
        >
          Test Create PG
        </button>

        <button
          onClick={testReduxIntegration}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 ml-2"
        >
          Test Redux Integration
        </button>
      </div>

      {testResult && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <pre className="text-sm">{testResult}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
