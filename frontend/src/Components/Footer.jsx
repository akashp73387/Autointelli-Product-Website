import React from "react";
import {
  FaGlobe,
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaChevronRight,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { motion } from "framer-motion";

const Footer = () => {
  const listItemVariants = {
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-gradient-to-r from-blue-100 to-purple-100 text-black border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AutoIntelli
              </h3>
              <p className="text-gray-600 mt-3">
                Intelligent automation solutions for the modern enterprise.
              </p>
              <div className="flex space-x-5 mt-4">
                {[FaLinkedin, FaTwitter, FaFacebook].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    variants={socialIconVariants}
                    whileHover="hover"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {["Home", "Products", "Solutions", "Pricing", "Contact"].map(
                  (item, index) => (
                    <motion.li
                      key={index}
                      variants={listItemVariants}
                      whileHover="hover"
                    >
                      <a
                        href="#"
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <FaChevronRight className="mr-2 text-xs text-blue-500" />
                        {item}
                      </a>
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>
          </div>

          {/* Resources */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Resources
              </h3>
              <ul className="space-y-3">
                {[
                  "Documentation",
                  "API Reference",
                  "Blog",
                  "Support",
                  "Community",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <a
                      href="#"
                      className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <FaChevronRight className="mr-2 text-xs text-purple-500" />
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <FaGlobe className="text-blue-600" size={14} />
                  </div>
                  <span className="text-gray-600">
                    484, Anna Salai, near US Consulate General Office,
                    <br />
                    Thousand Lights West, Teynampet,
                    <br />
                    Chennai, Tamil Nadu 600006
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <FaPhoneAlt className="text-blue-600" size={14} />
                  </div>
                  <span className="text-gray-600">+1 571 426 9715</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <IoMdMail className="text-blue-600" size={14} />
                  </div>
                  <a
                    href="mailto:sales@autointelli.com"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    sales@autointelli.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-300 my-12"
        ></motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Peakford Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["Terms", "Privacy", "GDPR", "Cookies", "Sitemap"].map(
              (item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-500 hover:text-blue-600 text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              )
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
