const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const todoSchema = new Schema({
  title: { type: String, require: true },
  completed: { type: Boolean, default: false },
});

const DataSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    dueDate: { type: Date },
    assignTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    attachments: [{ type: String }],
    assets: [{ type: String }],
    todoCheckList: [todoSchema],
    createdDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const TasksModel = mongoose.model("tasks", DataSchema);
module.exports = TasksModel;
