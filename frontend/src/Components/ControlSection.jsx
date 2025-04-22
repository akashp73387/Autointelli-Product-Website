import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const ControlSection = () => {
  return (
    <div>
      <div className="text-center mb-16 mt-5">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          Control and <span className="text-indigo-600"> Simplicity</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Autointelli combines the privacy of running your own server with the
          convenience of commercial cloud services.
        </p>
      </div>
      <div className="max-w-screen-lg mx-auto overflow-x-auto shadow-md sm:rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 p-6">
        <table className="w-full text-sm text-left rtl:text-right text-white border-collapse">
          <thead className="text-xs text-black uppercase border-b border-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Autointelli
              </th>
              <th scope="col" className="px-6 py-3">
                Ad Supported <br /> Cloud Service
              </th>
              <th scope="col" className="px-6 py-3">
                Own Server
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                label: "Simple to use, no sysadmin skills required",
                values: [true, true, false],
              },
              {
                label: "No tracking, profiling, or ads",
                values: [true, false, true],
              },
              {
                label: "Full control over your data",
                values: [true, false, true],
              },
              {
                label: "Source code is available",
                values: [true, false, true],
              },
              {
                label: "Managed app and server updates",
                values: [true, true, false],
              },
              {
                label: "Supports open-source authors financially",
                values: [true, false, false],
              },
            ].map((item, index) => (
              <tr key={index} className="border-b border-gray-400  ">
                <th scope="row" className="px-6 py-4 font-medium text-black">
                  {item.label}
                </th>
                {item.values.map((value, i) => (
                  <td key={i} className="px-6 py-4 pl-11">
                    {value ? (
                      <CheckCircle className="text-green-800/80" size={20} />
                    ) : (
                      <XCircle className="text-red-800/80" size={20} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ControlSection;
