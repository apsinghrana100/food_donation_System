import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import UserAuthicationVerify from "../middleware/authMiddlware.auth.js";
import { UserRegistration } from "../controllers/userController.js";

dotenv.config();
const router = express.Router();

// Google OAuth Route
router.get("/auth/google", (req, res) => {
  const scopes = process.env.GOOGLE_OAUTH_SCOPES
  const authUrl = `${process.env.GOOGLE_OAUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&scope=${encodeURIComponent(scopes)}&prompt=consent`;
    
  res.redirect(authUrl);
});

// Google OAuth Callback
router.get("/auth/google/callback", UserRegistration);

// Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ msg: "Logout successful", data: true });
});

// Protected Dashboard Route
router.get("/dashboard", UserAuthicationVerify, (req, res) => {
  res.send("<h1>Welcome to Dashboard</h1>");
});

export default router;
