const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["New task", "Message", "Update Task", "reminder"],
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    message: { type: String },
    isRead: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);