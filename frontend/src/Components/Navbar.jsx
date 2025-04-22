import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaAppStore,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="relative  z-20 bg-gray-100 text-black p-5 px-6 md:px-20 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center space-x-3">
          <img
            src="https://www.autointelli.com/assets/img/hero-logo.webp"
            alt="Logo"
            className="h-10 md:h-12 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <Link
          to="/available-apps"
          className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 group relative overflow-hidden"
        >
          <FaAppStore className="mr-2 transition-transform duration-300 group-hover:scale-110" />
          <span className="relative">
            Available Apps
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
        </Link>

        <Link
          to="/login"
          className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 group relative overflow-hidden"
        >
          <FaSignInAlt className="mr-2 transition-transform duration-300 group-hover:scale-110" />
          <span className="relative">
            Login
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
        </Link>

        <Link
          to="/signup"
          className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-md hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <FaUserPlus className="mr-2 transition-transform duration-300 hover:scale-110" />
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex-grow flex justify-end">
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-2xl transition-transform duration-300 hover:rotate-90" />
          ) : (
            <FaBars className="text-2xl transition-transform duration-300 hover:scale-110" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-gray-900 text-white p-5 flex flex-col space-y-4 shadow-xl md:hidden z-30"
          >
            <Link
              to="/available-apps"
              onClick={toggleMenu}
              className="flex items-center px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors duration-300 group"
            >
              <FaAppStore className="mr-3 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="group-hover:text-blue-400 transition-colors duration-300">
                Available Apps
              </span>
            </Link>
            <Link
              to="/login"
              onClick={toggleMenu}
              className="flex items-center px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors duration-300 group"
            >
              <FaSignInAlt className="mr-3 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="group-hover:text-blue-400 transition-colors duration-300">
                Login
              </span>
            </Link>
            <Link
              to="/signup"
              onClick={toggleMenu}
              className="flex items-center px-4 py-3 bg-gradient-to-tr from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600 rounded-lg shadow-md transition-all duration-300 group justify-center"
            >
              <FaUserPlus className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Sign Up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
