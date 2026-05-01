import express from "express";
import { createProject, getProjects } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin only
router.post("/", protect, isAdmin, createProject);

// Logged in users
router.get("/", protect, getProjects);

export default router;