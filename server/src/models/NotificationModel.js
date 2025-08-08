const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    relatedId: {
        type: mongoose.Schema.ObjectId
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);