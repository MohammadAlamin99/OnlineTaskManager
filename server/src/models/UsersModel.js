const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String },
    password: { type: String },
    role: { type: String, enum: ["admin", "member"], default: "member" },
    photo: { type: String },
    createdDate: { type: Date, default: Date.now() }
}, { versionKey: false })

const UsersModel = mongoose.model('users', dataSchema);
module.exports = UsersModel;