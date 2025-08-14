const mongoose = require("mongoose");
const NotificationModel = require("../models/NotificationModel");
const ObjectId = mongoose.Types.ObjectId;

exports.getNotification = async (req, res) => {
    try {
        let matchId = { $or: [] }
        if (req.query.users) {
            matchId.$or.push({ users: new ObjectId(req.query.users) })
        }
        let data = await NotificationModel.aggregate([
            { $match: matchId },
            { $sort: { createdAt: -1 } }
        ])
        return res.status(200).json({ status: "success", data: data })

    } catch (e) {
        return res.status(201).json({ status: "fail", data: e })
    }
}


exports.markAsRead = async (req, res) => {
    try {
        const { notificationId, userId } = req.body;

        await NotificationModel.findByIdAndUpdate(notificationId, {
            $addToSet: { isRead: userId } // avoid duplicates
        });

        return res.status(200).json({ status: "success", message: "Notification mark as read" });
    } catch (e) {
        return res.status(500).json({ status: "fail", data: e });
    }
}
