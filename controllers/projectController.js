import Project from "../models/Project.js";
import User from "../models/User.js";

// CREATE PROJECT (Admin only)
export const createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      members
    });

    res.status(201).json({
      message: "Project created",
      project
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL PROJECTS (user ke according)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    }).populate("members", "name email");

    res.json(projects);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};