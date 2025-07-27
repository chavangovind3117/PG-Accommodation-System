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
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookingPage from "./pages/BookingPage";
import OwnerDashboard from "./pages/OwnerDashboard";
import MyBookings from "./pages/MyBookings";
import SavedPGs from "./pages/SavedPGs";
import OwnerPGs from "./pages/OwnerPGs";
import OwnerBookings from "./pages/OwnerBookings";
import AddNewPG from "./pages/AddNewPG";
import DashboardLayout from "./components/layouts/DashboardLayout";
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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/error" element={<Error />} />

        {/* Protected Routes with Dashboard Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="saved" element={<SavedPGs />} />
          <Route path="owner-dashboard" element={<OwnerDashboard />} />
          <Route path="owner-properties" element={<OwnerPGs />} />
          <Route path="owner-bookings" element={<OwnerBookings />} />
          <Route path="add-new-pg" element={<AddNewPG />} />
          {/* <Route
            path="owner-analytics"
            element={<div>Owner Analytics Page (Coming Soon)</div>}
          />
          <Route
            path="owner-settings"
            element={<div>Owner Settings Page (Coming Soon)</div>}
          /> */}
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
