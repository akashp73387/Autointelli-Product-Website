import express from "express";
import {
  forgotPassword,
  generate2FA,
  getuser,
  google,
  loginUser,
  registerUser,
  resetPassword,
  verify2FA,
} from "../Controllers/UserController.js";
import authMiddleware from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/get-user", authMiddleware, getuser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.post("/google", google);
router.post("/generate-2fa", generate2FA);
router.post("/verify-2fa", verify2FA);

export default router;
