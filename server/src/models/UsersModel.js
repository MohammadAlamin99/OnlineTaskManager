const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    name: { type: String, require: true },
    mobile: { type: String },
    password: { type: String },
    role: { type: String, enum: ["admin", "member"], default: "member" },
    designation: { type: String },
    isActive: { type: Boolean, default: true },
    photo: { type: String },
    createdDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const UsersModel = mongoose.model("users", dataSchema);
module.exports = UsersModel;
