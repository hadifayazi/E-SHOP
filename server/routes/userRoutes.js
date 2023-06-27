import express from "express";
import {
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/authController.js";
import isAuthenticated from "../utils/isAuthenticated.js";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);

router.get("/get-user", isAuthenticated, getUser);

export default router;
