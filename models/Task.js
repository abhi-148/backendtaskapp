import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"]
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description too long"]
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    },

    // 🔥 PRIORITY
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    // 🔥 DUE DATE
    dueDate: {
      type: Date
    },

    // 🔥 AUTO COMPLETION TIME
    completedAt: {
      type: Date
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },   // 🔥 IMPORTANT
    toObject: { virtuals: true }
  }
);



// ==============================
// ✅ FIXED MIDDLEWARE
// ==============================
taskSchema.pre("save", function () {
  if (this.status === "done" && !this.completedAt) {
    this.completedAt = new Date();
  }

  if (this.status !== "done") {
    this.completedAt = null;
  }
});



// ==============================
// 🔥 INDEXING (FAST QUERIES)
// ==============================
taskSchema.index({ projectId: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ dueDate: 1 });



// ==============================
// 🔥 VIRTUAL FIELD
// ==============================
taskSchema.virtual("isOverdue").get(function () {
  return (
    this.dueDate &&
    this.dueDate < new Date() &&
    this.status !== "done"
  );
});



export default mongoose.model("Task", taskSchema);