import express from "express";
import { verifyEmail, login } from "../controllers/authController.js";
import isAuthenticated from "../utils/isAuthenticated.js";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/get-user", isAuthenticated, getUser);

export default router;
