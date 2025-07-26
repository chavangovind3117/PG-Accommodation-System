import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./pages/EmailVerification";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import FindPG from "./pages/FindPG";
import PGDetails from "./pages/PGDetails";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/search" element={<FindPG />} />
        <Route path="/pg/:id" element={<PGDetails />} />
        <Route path="/error" element={<Error />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <div>My Bookings Page (Coming Soon)</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <div>Saved PGs Page (Coming Soon)</div>
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
