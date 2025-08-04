import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../features/auth/authSlice";

const AuthTest = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, userRole, loading, error } = useSelector(
    (state) => state.auth
  );
  const [testResult, setTestResult] = useState("");

  const testLogin = async () => {
    setTestResult("Testing login...");

    try {
      const loginData = {
        email: "test@example.com",
        password: "password123",
        role: "USER",
      };

      console.log("Testing login with:", loginData);
      const result = await dispatch(loginUser(loginData)).unwrap();

      setTestResult(
        `Login successful!\nUser: ${JSON.stringify(result, null, 2)}`
      );
    } catch (error) {
      setTestResult(`Login failed: ${error}`);
    }
  };

  const testSignup = async () => {
    setTestResult("Testing signup...");

    try {
      const signupData = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
        role: "USER",
        phone: "1234567890",
      };

      console.log("Testing signup with:", signupData);
      const result = await dispatch(signupUser(signupData)).unwrap();

      setTestResult(
        `Signup successful!\nUser: ${JSON.stringify(result, null, 2)}`
      );
    } catch (error) {
      setTestResult(`Signup failed: ${error}`);
    }
  };

  const testCustomLogin = async () => {
    const email = prompt("Enter email:");
    const password = prompt("Enter password:");
    const role = prompt("Enter role (USER/OWNER):", "USER");

    if (!email || !password) {
      setTestResult("Email and password are required");
      return;
    }

    setTestResult("Testing custom login...");

    try {
      const loginData = {
        email,
        password,
        role: role.toUpperCase(),
      };

      console.log("Testing custom login with:", loginData);
      const result = await dispatch(loginUser(loginData)).unwrap();

      setTestResult(
        `Custom login successful!\nUser: ${JSON.stringify(result, null, 2)}`
      );
    } catch (error) {
      setTestResult(`Custom login failed: ${error}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Authentication Test</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Current State:</h3>
        <div className="text-sm space-y-1">
          <p>
            <strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}
          </p>
          <p>
            <strong>User Role:</strong> {userRole || "None"}
          </p>
          <p>
            <strong>Loading:</strong> {loading ? "Yes" : "No"}
          </p>
          <p>
            <strong>Error:</strong> {error || "None"}
          </p>
          <p>
            <strong>User:</strong>{" "}
            {user ? JSON.stringify(user, null, 2) : "None"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={testLogin}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Login (Default)
        </button>

        <button
          onClick={testSignup}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 ml-2"
        >
          Test Signup
        </button>

        <button
          onClick={testCustomLogin}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50 ml-2"
        >
          Test Custom Login
        </button>
      </div>

      {testResult && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Test Result:</h3>
          <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}
    </div>
  );
};

export default AuthTest;
