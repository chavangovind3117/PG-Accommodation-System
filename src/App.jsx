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
import EditPG from "./pages/EditPG";
import DashboardLayout from "./components/layouts/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RoleBasedRoute from "./components/common/RoleBasedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/search" element={<FindPG />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/error" element={<Error />} />

        {/* Protected Routes with Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="saved" element={<SavedPGs />} />
          <Route path="pg-details/:id" element={<PGDetails />} />
        </Route>

        {/* Owner-specific protected routes */}
        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["owner"]}>
                <DashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<OwnerDashboard />} />
          <Route path="properties" element={<OwnerPGs />} />
          <Route path="bookings" element={<OwnerBookings />} />
          <Route path="add-new-pg" element={<AddNewPG />} />
          <Route path="edit-pg/:id" element={<EditPG />} />
        </Route>

        {/* Additional protected routes for better navigation */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
        </Route>

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MyBookings />} />
        </Route>

        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SavedPGs />} />
        </Route>

        <Route
          path="/owner-properties"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["owner"]}>
                <DashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<OwnerPGs />} />
        </Route>

        <Route
          path="/owner-bookings"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["owner"]}>
                <DashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<OwnerBookings />} />
        </Route>

        <Route
          path="/add-new-pg"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["owner"]}>
                <DashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<AddNewPG />} />
        </Route>

        <Route
          path="/edit-pg/:id"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["owner"]}>
                <DashboardLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<EditPG />} />
        </Route>

        <Route
          path="/pg-details/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PGDetails />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
