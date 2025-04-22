
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import Navbar from "../Components/Navbar";

const apps = [
  { name: "WordPress", category: "CMS", logo: "/images/wordpress.svg" },
  { name: "Next.js", category: "Framework", logo: "/images/nextjs.svg" },
  { name: "Ghost", category: "Blog", logo: "/images/ghost.svg" },
  { name: "Strapi", category: "CMS", logo: "/images/strapi.svg" },
  { name: "Laravel", category: "Backend", logo: "/images/laravel.svg" },
  { name: "Node.js", category: "Backend", logo: "/images/nodejs.svg" },
  { name: "React", category: "Frontend", logo: "/images/react.svg" },
];

const AvailableApps = () => {
  const [search, setSearch] = useState("");

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center py-12 px-6">
      {/* Page Heading */}
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Available Apps
      </motion.h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg mb-6">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search apps..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-3 w-full bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Apps Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {filteredApps.map((app, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            }}
          >
            <img src={app.logo} alt={app.name} className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-semibold">{app.name}</h2>
            <p className="text-sm text-gray-400">{app.category}</p>
            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Deploy Now
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
</>
  );
};

export default AvailableApps;
