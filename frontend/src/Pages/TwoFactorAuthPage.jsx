import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";

const TwoFactorAuthPage = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
useEffect(() => {
  const fetchQRCode = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.email) {
      console.error("User not found or email missing.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/user/generate-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }), // ✅ use real user email
      });

      if (!res.ok) {
        throw new Error("Failed to generate QR code");
      }

      const data = await res.json();
      setQrCodeUrl(data.qrCode);
      localStorage.setItem("2fa-secret", data.secret);
    } catch (err) {
      console.error("Error generating QR Code:", err.message);
    }
  };

  fetchQRCode();
}, []);


  const handleVerify = async () => {
    const secret = localStorage.getItem("2fa-secret");

    const res = await fetch("http://localhost:5000/api/user/verify-2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, secret }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      setTimeout(() => {
        navigate("/available-apps");
      }, 1000);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Animated Background */}
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
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
          },
        }}
      >
        <motion.div
          className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10 p-8 rounded-3xl shadow-2xl max-w-md w-full"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
        >
          <motion.h2
            className="text-3xl font-bold text-white text-center mb-4"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
            }}
          >
            Setup Two-Factor Authentication
          </motion.h2>

          {qrCodeUrl ? (
            <>
              <motion.p
                className="text-gray-300 text-center mb-4"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
                }}
              >
                Scan this QR code with Google Authenticator:
              </motion.p>

              <motion.img
                src={qrCodeUrl}
                alt="QR Code"
                className="mx-auto mb-6 rounded-md"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
                }}
              />

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerify();
                }}
                className="space-y-4"
              >
                <motion.input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.5 },
                    },
                  }}
                />

                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white font-medium rounded-xl hover:from-red-700 hover:to-purple-700 shadow-lg transition-all"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  Verify Code
                </motion.button>
              </form>

              {message && (
                <motion.p
                  className="mt-4 text-center text-gray-200"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  {message}
                </motion.p>
              )}
            </>
          ) : (
            <motion.p
              className="text-gray-300 text-center"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
              }}
            >
              Loading QR code...
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      <style>{`
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

export default TwoFactorAuthPage;
