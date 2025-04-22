import React from "react";
import { AppWindow, Rocket } from "lucide-react";

const FeaturedApp = () => {
  const apps = [
    {
      name: "Immich",
      img: "https://play-lh.googleusercontent.com/nJsRIdtaot1-FKH3kiRem4kjqUU1-_0hd_64qZH0BgtzUecYfWLCDfpk2nNVul8hOrw",
      description:
        " Immich is a Google Photos alternative to manage and share your photos and videos. Comes with its own mobile app, as well as AI and search features.",
    },
    {
      name: "Umami",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu376I2vEUZuSEM_JQVv63-h5g5TonlnDPBhUGnOPEymPzE6fWo2VYQ6XJ7tAlQLZ1hM0&usqp=CAU",
      description:
        "Umami is a simple, easy-to-use, self-hosted web analytics solution. A privacy-focused alternative to Google Analytics with only essential metrics.",
    },
    {
      name: "Uptime Kuma",
      img: "https://www.siteandserver.co.uk/media/posts/78/uptime.svg",
      description:
        "Uptime Kuma is a self-hosted monitoring tool to check uptime for HTTP(s), TCP, keywords, and DNS. It also supports multiple status pages.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100  pt-20 pb-10">
      <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Powerful Apps with{" "}
            <span className="text-indigo-600">Autointelli</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore top self-hosted applications that enhance your workflow and
            efficiency.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
          {apps.map((app, index) => (
            <div
              key={index}
              className="bg-gradient-to-tr from-blue-50 to-purple-50 text-black p-6 text-center rounded-lg shadow-lg h-full flex flex-col items-center"
            >
              <img
                src={app.img}
                alt={app.name}
                className="w-24 h-24 object-contain rounded-md"
              />
              <div className="p-6 flex-grow">
                <p className="text-gray-600 text-sm mt-3">
                  <span className="font-bold text-black">{app.name}</span>
                  {app.description.replace(app.name, "")}
                </p>
              </div>

              {/* Run Your Code Link */}
              <a
                href="#"
                className="mt-4 flex items-center text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                <Rocket size={18} className="mr-2" />
                Run Your Code
              </a>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-16">
          <button className="bg-white border border-sky-700 text-black px-6 py-3 rounded-lg text-lg font-semibold shadow-md flex items-center gap-3 transition duration-300 hover:bg-black hover:text-white">
            <AppWindow size={24} />
            <span>View All Available Apps</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedApp;
