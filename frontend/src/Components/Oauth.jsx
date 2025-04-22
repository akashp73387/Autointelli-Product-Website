import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc"; 
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { app } from '../Firebase';



const Oauth = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("http://localhost:5000/api/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          profilePicture: result.user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("Token", data.token);
        navigate("/available-apps");
      } else {
        setErrorMsg(data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };



    return (
      <div>
        {/* Divider */}
        <motion.div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </motion.div>

        {/* Social Login Icons */}
        <motion.div className="flex justify-center items-center gap-6">
          {/* Google */}
          <button onClick={handleSubmit}>
            <FcGoogle className="w-8 h-8 hover:scale-110 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
};

export default Oauth;