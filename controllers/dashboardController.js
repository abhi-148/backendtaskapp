import Task from "../models/Task.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user?.id; // 🔐 agar auth use kar rahe ho

    // 🔹 FILTER (sirf current user ke tasks)
    const filter = userId ? { assignedTo: userId } : {};

    // 🔹 COUNTS (parallel run for performance 🚀)
    const [
      total,
      completed,
      pending,
      inProgress,
      overdue,
      recentTasks
    ] = await Promise.all([

      Task.countDocuments(filter),

      Task.countDocuments({
        ...filter,
        status: "done"
      }),

      Task.countDocuments({
        ...filter,
        status: "todo"
      }),

      Task.countDocuments({
        ...filter,
        status: "in-progress"
      }),

      Task.countDocuments({
        ...filter,
        dueDate: { $lt: new Date() },
        status: { $ne: "done" }
      }),

      // 🔥 NEW: Recent Tasks
      Task.find(filter)
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 }) // latest first
        .limit(5)
    ]);

    // 🔹 FINAL RESPONSE
    res.json({
      totalTasks: total,
      completedTasks: completed,
      pendingTasks: pending,
      inProgressTasks: inProgress,
      overdueTasks: overdue,
      recentTasks
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};