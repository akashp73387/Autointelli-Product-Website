import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import Oauth from "../Components/Oauth";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      return setErrorMessage("Please fill out all fields.");
    }

    if (password !== confirmPassword) {
      return setErrorMessage("Passwords do not match.");
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/register-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      <Navbar />
      <motion.div className="relative flex items-center justify-center min-h-screen px-4 py-12">
        <motion.div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10 p-8 rounded-3xl shadow-2xl max-w-md w-full">
          <div className="text-center mb-8">
            <motion.h2 className="text-3xl font-bold text-white mb-2">
              Join Our Community
            </motion.h2>
            <motion.p className="text-gray-300">
              Create your account to get started
            </motion.p>
          </div>

          {errorMessage && (
            <motion.div className="mb-6 p-3 bg-red-900 bg-opacity-30 text-red-100 rounded-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {errorMessage}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 pr-4 py-3 w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 py-3 w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FiEye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Re-Enter Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 py-3 w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FiEye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {/* Optional live feedback */}
              {formData.confirmPassword && (
                <p
                  className={`text-sm mt-1 ${
                    formData.password === formData.confirmPassword
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {formData.password === formData.confirmPassword
                    ? "Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 rounded-xl font-medium text-white transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 shadow-lg"
                }`}
              >
                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    Sign Up <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <Oauth />

          <div className="mt-8 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-400 hover:text-red-300 font-medium transition-colors hover:underline"
            >
              Login here
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
