import React from "react";
import {
  ShieldCheck,
  Database,
  Users,
  Globe,
  LayoutGrid,
  Rocket,
} from "lucide-react";

const CardSection = () => {
  const services = [
    {
      title: "No tracking, no ads",
      desc: "We only sell hosting services and not your data or ads.",
      icon: <Globe className="text-indigo-600" size={40} />,
      bg: "from-indigo-50 to-indigo-100",
    },
    {
      title: "Simple interface",
      desc: "We manage all configurations, databases, and other details in the background.",
      icon: <LayoutGrid className="text-emerald-600" size={40} />,
      bg: "from-emerald-50 to-emerald-100",
    },
    {
      title: "Speedy updates",
      desc: "We test and apply updates weekly, so you get a stable and up-to-date experience.",
      icon: <Rocket className="text-amber-600" size={40} />,
      bg: "from-amber-50 to-amber-100",
    },
    {
      title: "Secure and confidential",
      desc: "Every pod runs in isolation and connections are always encrypted.",
      icon: <ShieldCheck className="text-blue-600" size={40} />,
      bg: "from-blue-50 to-blue-100",
    },
    {
      title: "Rewarding open source authors",
      desc: "Where possible, part of the revenue goes to the original author.",
      icon: <Users className="text-purple-600" size={40} />,
      bg: "from-purple-50 to-purple-100",
    },
    {
      title: "Direct data access",
      desc: "Access your data or database directly, if needed.",
      icon: <Database className="text-rose-600" size={40} />,
      bg: "from-rose-50 to-rose-100",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-start px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20">
      {/* Content Wrapper */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why run your app on{" "}
            <span className="text-indigo-600">Autointelli</span>..?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the next generation of hosting with our cutting-edge
            features.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden 
              transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.bg} opacity-30`}
              ></div>
              <div className="relative p-6 md:p-8 h-full flex flex-col">
                <div
                  className="mb-6 p-3 bg-white rounded-lg w-fit shadow-sm 
                  group-hover:scale-110 transition-transform duration-300"
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 flex-grow">{service.desc}</p>
                <div className="mt-6 pt-4 border-t border-gray-200 border-opacity-50">
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <button
            className="px-6 py-3 text-lg font-semibold text-white bg-indigo-600 
            rounded-xl shadow-md hover:bg-indigo-700 transition-all"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
