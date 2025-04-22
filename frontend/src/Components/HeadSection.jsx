import React from "react";
import {
  Rocket,
  ShieldCheck,
  DollarSign,
  Headphones,
  Server,
  HelpCircle,
  AppWindow,
  ArrowRight,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const HeadSection = () => {
  const features = [
    {
      icon: <Rocket size={28} />,
      text: "Fully managed, no servers to administer",
      color: "purple",
    },
    {
      icon: <ShieldCheck size={28} />,
      text: "No tracking, no ads, no snooping",
      color: "blue",
    },
    {
      icon: <DollarSign size={28} />,
      text: "Use your own domain",
      color: "green",
    },
    {
      icon: <Headphones size={28} />,
      text: "EU and US locations available",
      color: "yellow",
    },
  ];

  const colorMap = {
    purple: "bg-purple-50 text-purple-500 group-hover:bg-purple-100",
    blue: "bg-blue-50 text-blue-500 group-hover:bg-blue-100",
    green: "bg-green-50 text-green-500 group-hover:bg-green-100",
    yellow: "bg-yellow-50 text-yellow-500 group-hover:bg-yellow-100",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center 
        rounded-3xl mx-4 md:mx-2 gap-6 p-4 md:p-12 lg:p-16 lg:min-h-[85vh] 
        overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-100 opacity-20"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content Wrapper */}
      <motion.div
        className="relative flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 md:space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-800"
          variants={itemVariants}
        >
          Instant{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Open Source
          </span>{" "}
          <br /> App Hosting
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-2xl"
          variants={itemVariants}
        >
          Deploy the finest Open Source web apps in seconds, starting at just
          <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md ml-1">
            $1.20/month
          </span>
          .
        </motion.p>

        <motion.div
          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-600 font-medium text-sm md:text-base flex items-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap size={16} className="mr-2 text-yellow-500 fill-yellow-400" />
          Start free with $5 welcome credit
          <ArrowRight size={16} className="ml-2" />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 px-6 py-4 rounded-xl shadow-sm 
              hover:shadow-md flex items-center space-x-4 transition-all group 
              backdrop-blur-sm bg-opacity-70"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className={`p-3 rounded-lg ${
                  colorMap[feature.color]
                } transition-colors`}
              >
                {feature.icon}
              </div>
              <p className="text-gray-700 font-medium flex items-center">
                {feature.text}
                <HelpCircle
                  size={16}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                />
              </p>
            </motion.div>
          ))}

          {/* Last Card - Full width */}
          <motion.div className="sm:col-span-2" variants={itemVariants}>
            <div
              className="bg-white border border-gray-200 px-6 py-4 rounded-xl 
              shadow-sm hover:shadow-md flex flex-col sm:flex-row items-center 
              justify-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0
              transition-all group backdrop-blur-sm bg-opacity-70"
            >
              <div
                className="p-3 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 
                group-hover:from-cyan-100 group-hover:to-blue-100 transition-colors"
              >
                <Server size={28} className="text-cyan-500" />
              </div>
              <p className="text-gray-700 font-medium flex items-center">
                High-performance dedicated servers
                <HelpCircle
                  size={16}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                />
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-10"
          variants={itemVariants}
        >
          <motion.button
            className="relative bg-gradient-to-r from-blue-400 to-purple-500 text-white px-8 py-4 rounded-xl 
            text-lg font-semibold shadow-lg flex items-center justify-center space-x-3 
            overflow-hidden group"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <AppWindow size={24} className="relative z-10" />
            <span className="relative z-10">View Available Apps</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeadSection;
