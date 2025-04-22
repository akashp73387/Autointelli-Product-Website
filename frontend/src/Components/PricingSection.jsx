import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Cpu,
  Server,
  HardDrive,
  Zap,
  Shield,
  GitBranch,
  Download,
  Rabbit,
} from "lucide-react";

const PricingSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [cpu, setCpu] = useState(2.5);
  const [memory, setMemory] = useState(4);
  const [storage, setStorage] = useState(100);

  const faqs = [
    {
      question: "How is this better than running my own server?",
      answer:
        "We host your apps at the container level with everything taken care of. This includes OS and app updates, regular backups, and monitoring.",
      icon: <Zap size={18} className="text-yellow-500 mr-2" />,
    },
    {
      question: "How do you deploy apps?",
      answer:
        "We use rootless containers with additional SELinux restrictions applied. This combines security from containers, traditional Unix users, and SELinux.",
      icon: <Shield size={18} className="text-blue-500 mr-2" />,
    },
    {
      question: "How much do open-source developers get?",
      answer:
        "Open-source developers have the option to enter into a revenue-sharing agreement to receive 20% of revenues their app generates.",
      icon: <GitBranch size={18} className="text-green-500 mr-2" />,
    },
    {
      question: "Who owns the data I keep on your service?",
      answer:
        "You do. And you're in full control. If you ever want to download, migrate, edit, or delete your data, just enable SFTP access to your Pod.",
      icon: <Download size={18} className="text-purple-500 mr-2" />,
    },
    {
      question: "What is a Pika? What is a Pod?",
      answer:
        "A Pika is a small mammal, best described as a mix between a mouse and a rabbit. A Pod is a group of containers belonging to the same app.",
      icon: <Rabbit size={18} className="text-red-500 mr-2" />,
    },
  ];

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const calculatePrice = () => {
    return (cpu * 10 + memory * 5 + storage * 0.1).toFixed(2);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          Transparent <span className="text-indigo-600"> Pricing</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Pay only for what you use with our flexible pricing model. No hidden
          fees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Pricing Card */}
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Configure Your Plan
            </h2>

            {/* CPU Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Cpu size={20} className="text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">CPU Cores</span>
                  <HelpCircle size={18} className="text-gray-400 ml-2" />
                </div>
                <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {cpu} Cores
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={cpu}
                onChange={(e) => setCpu(parseFloat(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5</span>
                <span>5</span>
              </div>
            </div>

            {/* Memory Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Server size={20} className="text-green-600 mr-2" />
                  <span className="font-medium text-gray-900">Memory (GB)</span>
                  <HelpCircle size={18} className="text-gray-400 ml-2" />
                </div>
                <span className="text-sm font-semibold bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {memory} GB
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="32"
                step="2"
                value={memory}
                onChange={(e) => setMemory(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>2</span>
                <span>32</span>
              </div>
            </div>

            {/* Storage Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <HardDrive size={20} className="text-red-600 mr-2" />
                  <span className="font-medium text-gray-900">
                    Storage (GB)
                  </span>
                  <HelpCircle size={18} className="text-gray-400 ml-2" />
                </div>
                <span className="text-sm font-semibold bg-red-100 text-red-800 px-3 py-1 rounded-full">
                  {storage} GB
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="50"
                value={storage}
                onChange={(e) => setStorage(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-red-400 to-red-600 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50</span>
                <span>500</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="mt-10 text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                ${calculatePrice()}
                <span className="text-lg font-medium text-gray-500">
                  /month
                </span>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Get Started
              </button>
              <p className="text-sm text-gray-500 mt-3">
                No credit card required. Free 14-day trial.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 ${
                  openIndex === index
                    ? "ring-2 ring-blue-100"
                    : "hover:shadow-md"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left transition-all"
                  onClick={() => toggleDropdown(index)}
                >
                  <div className="flex items-center">
                    {faq.icon}
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </button>
                <div
                  className={`px-5 pb-5 transition-all duration-300 ${
                    openIndex === index
                      ? "opacity-100"
                      : "opacity-0 h-0 overflow-hidden"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
