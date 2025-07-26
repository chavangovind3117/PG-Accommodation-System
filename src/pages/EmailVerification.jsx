import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/footer";
import homeIcon from "../assets/Login/home-icon.png";
import { Link, useParams, useSearchParams } from "react-router-dom";

const EmailVerification = () => {
  const { token } = useParams(); // eslint-disable-line no-unused-vars
  const [searchParams] = useSearchParams(); // eslint-disable-line no-unused-vars
  const [verificationStatus, setVerificationStatus] = useState("loading"); // loading, success, error
  const [email, setEmail] = useState(""); // eslint-disable-line no-unused-vars

  useEffect(() => {
    // Simulate verification process
    const verifyEmail = async () => {
      try {
        // Add your verification logic here
        // const response = await verifyEmailAPI(token);
        console.log("Verifying email with token:", token);

        // Simulate API call
        setTimeout(() => {
          if (token) {
            setVerificationStatus("success");
            setEmail("user@example.com"); // Replace with actual email
          } else {
            setVerificationStatus("error");
          }
        }, 2000);
      } catch {
        setVerificationStatus("error");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setVerificationStatus("pending");
    }
  }, [token]);

  const resendVerification = () => {
    // Add resend verification logic here
    console.log("Resending verification email");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          {/* Branding Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <img
                  src={homeIcon}
                  alt="PGFinder"
                  className="w-8 h-8"
                  style={{ width: 27, height: 29 }}
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Email Verification
            </h1>
            <p className="text-gray-600">Verify your email address</p>
          </div>

          {/* Verification Status Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {verificationStatus === "loading" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-blue-600 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Verifying your email...
                </h3>
                <p className="text-gray-600">
                  Please wait while we verify your email address.
                </p>
              </div>
            )}

            {verificationStatus === "success" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Email Verified Successfully!
                </h3>
                <p className="text-gray-600">
                  Your email address has been verified. You can now access all
                  features.
                </p>
                <Link
                  to="/login"
                  className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}

            {verificationStatus === "error" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Verification Failed
                </h3>
                <p className="text-gray-600">
                  The verification link is invalid or has expired. Please
                  request a new one.
                </p>
                <button
                  onClick={resendVerification}
                  className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Resend Verification
                </button>
              </div>
            )}

            {verificationStatus === "pending" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Check Your Email
                </h3>
                <p className="text-gray-600">
                  We've sent a verification link to your email address. Please
                  check your inbox and click the link to verify your account.
                </p>
                <button
                  onClick={resendVerification}
                  className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Resend Email
                </button>
              </div>
            )}

            {/* Navigation Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already verified?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailVerification;
