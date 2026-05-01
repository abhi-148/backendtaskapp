import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only logged in users
router.get("/user", protect, (req, res) => {
  res.json({ message: "User access granted", user: req.user });
});

// Only admin
router.get("/admin", protect, isAdmin, (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;