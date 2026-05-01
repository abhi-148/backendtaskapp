import Task from "../models/Task.js";


// ==========================
// CREATE TASK
// ==========================
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;

    // ✅ VALIDATION
    if (!title || !projectId) {
      return res.status(400).json({
        error: "Title and Project ID are required"
      });
    }

    // ✅ USER CHECK (VERY IMPORTANT)
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        error: "Unauthorized - No user found"
      });
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo: assignedTo || req.user.id, // fallback
      createdBy: req.user.id,
      dueDate
    });

    res.status(201).json({
      message: "Task created successfully ✅",
      task
    });

  } catch (err) {
    console.log("CREATE TASK ERROR:", err);
    res.status(500).json({
      error: err.message
    });
  }
};



// ==========================
// GET TASKS
// ==========================
export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;

    // optional filter
    const filter = {
      assignedTo: req.user.id
    };

    if (projectId) {
      filter.projectId = projectId;
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (err) {
    console.log("GET TASK ERROR:", err);
    res.status(500).json({
      error: err.message
    });
  }
};



// ==========================
// UPDATE TASK STATUS
// ==========================
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        error: "Status is required"
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.json({
      message: "Task updated successfully ✅",
      task
    });

  } catch (err) {
    console.log("UPDATE TASK ERROR:", err);
    res.status(500).json({
      error: err.message
    });
  }
};



// ==========================
// DELETE TASK (BONUS 🔥)
// ==========================
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully 🗑️"
    });

  } catch (err) {
    console.log("DELETE TASK ERROR:", err);
    res.status(500).json({
      error: err.message
    });
  }
};