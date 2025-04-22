import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiClock } from "react-icons/fi";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          data.message ||
            "If your email is registered, you'll receive a reset link."
        );
      } else {
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage(
        "Failed to send request. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-10 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-10 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <Navbar />

      <motion.div
        className="relative flex items-center justify-center min-h-screen px-4 py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10 p-8 rounded-3xl shadow-2xl max-w-md w-full"
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <motion.div
              className="flex justify-center mb-4"
              variants={itemVariants}
            >
              <div className="p-3 bg-red-900 bg-opacity-20 rounded-full">
                <FiClock className="text-red-400 text-3xl" />
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl font-bold text-white mb-2"
              variants={itemVariants}
            >
              Reset Your Password
            </motion.h2>
            <motion.p className="text-gray-300" variants={itemVariants}>
              Enter your email to receive a password reset link
            </motion.p>
          </div>

          {message && (
            <motion.div
              className="mb-6 p-3 bg-green-900 bg-opacity-30 text-green-100 rounded-lg flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {message}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Link...
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          <motion.div
            className="mt-8 text-center text-gray-400 text-sm"
            variants={itemVariants}
          >
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-red-400 hover:text-red-300 font-medium transition-colors hover:underline"
            >
              Log in
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx="true">{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordPage;
