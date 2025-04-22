import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import Oauth from "../Components/Oauth";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (!formData.email || !formData.password) {
     return setErrorMessage("Please fill out all fields.");
   }

   setLoading(true);
   setErrorMessage(null);

   try {
     const response = await fetch("http://localhost:5000/api/user/login-user", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(formData),
     });

     const data = await response.json();

     if (!response.ok) {
       throw new Error(data.message || "Login failed. Please try again.");
     }

     // ✅ Save token
     localStorage.setItem("token", data.token);

     // ✅ Save user info (only email for now)
     localStorage.setItem("user", JSON.stringify({ email: formData.email }));

     // ✅ Navigate to 2FA
     navigate("/TwoFactorAuth");
   } catch (error) {
     setErrorMessage(error.message);
   } finally {
     setLoading(false);
   }
 };

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
            <motion.h2
              className="text-3xl font-bold text-white mb-2"
              variants={itemVariants}
            >
              Welcome Back
            </motion.h2>
            <motion.p className="text-gray-300" variants={itemVariants}>
              Sign in to continue to your account
            </motion.p>
          </div>

          {errorMessage && (
            <motion.div
              className="mb-6 p-3 bg-red-900 bg-opacity-30 text-red-100 rounded-lg flex items-center"
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {errorMessage}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 pr-4 py-3 w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 py-3 w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
            </motion.div>

            <motion.div
              className="flex items-center justify-between"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-red-400 hover:text-red-300"
                >
                  Forgot password?
                </Link>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
              onClick={() => console.log("Normal login")}
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
                    Signing In...
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          </form>
          <Oauth/>
          <motion.div
            className="mt-8 text-center text-gray-400 text-sm"
            variants={itemVariants}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-red-400 hover:text-red-300 font-medium transition-colors hover:underline"
            >
              Sign up
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
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

export default LoginPage;
