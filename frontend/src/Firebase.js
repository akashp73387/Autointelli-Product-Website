// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "autointelli-product-website.firebaseapp.com",
  projectId: "autointelli-product-website",
  storageBucket: "autointelli-product-website.firebasestorage.app",
  messagingSenderId: "187797368907",
  appId: "1:187797368907:web:6cb10b09dc3ca4b86c1dce",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
