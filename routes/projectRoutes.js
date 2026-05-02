import express from "express";
import { createProject, getProjects } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET projects
router.get("/", protect, getProjects);

// 🔥 IMPORTANT (missing था)
router.post("/", protect, createProject);

export default router;