const NotificationModel = require("../models/NotificationModel");
const TasksModel = require("../models/TasksModel");
const io = require("../../../socket/socket");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Create tasks
exports.CreateTask = async (req) => {
  try {
    if (req.headers["role"] === "admin") {
      let reqBody = req.body;

      // create task
      let data = await TasksModel.create(reqBody);
      let text = "New task has been assigned to you";
      if (reqBody.assignTo?.length > 1) {
        text = text + ` and ${reqBody.assignTo?.length - 1} others.`;
      }

      text = text + ` The task priority is set a ${reqBody.priority} priority, so check and act accordingly. The task date is ${new Date(reqBody.dueDate).toDateString()}.Thank you!!!`;

      // Create notification
      let notification = await NotificationModel.create({
        users: reqBody.assignTo,
        message: text,
      });

      return { status: "success", data: data, notification: notification };
    }
    else {
      return { status: "fail", message: "Only admin can create tasks" };
    }
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};

// getting all task
exports.getAllTask = async (req) => {
  try {
    let matchStage = { $or: [] };
    if (req.query.createdBy) {
      matchStage.$or.push({ createdBy: new ObjectId(req.query.createdBy) });
    }
    if (req.query.assignTo) {
      matchStage.$or.push({ assignTo: new ObjectId(req.query.assignTo) });
    }
    let data = await TasksModel.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "users",
          localField: "assignTo",
          foreignField: "_id",
          as: "assignTo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $project: {
          "assignTo._id": 0,
          "createdBy._id": 0,
          "createdBy.email": 0,
          "createdBy.password": 0,
          "createdBy.mobile": 0,
          "assignTo.password": 0,
          "assignTo.createdDate": 0,
        },
      },
    ]);

    return { status: "Success", data: data };
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

// get task by id
exports.getTaskById = async (req) => {
  try {
    const id = new ObjectId(req.query.id);
    let data = await TasksModel.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: "users",
          localField: "assignTo",
          foreignField: "_id",
          as: "assignTo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $project: {
          "createdBy.email": 0,
          "createdBy.password": 0,
          "createdBy.mobile": 0,
          "assignTo.password": 0,
          "assignTo.createdDate": 0,
        },
      },
    ]);

    return { status: "Success", data: data };
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

// update Task
exports.updaeTask = async (req) => {
  try {
    let reqBody = req.body;
    let id = req.body.id;
    let Query = { _id: id };
    let data = await TasksModel.updateOne(Query, reqBody);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

// Delete Task
exports.deleteTask = async (req) => {
  try {
    if (req.headers["role"] === "admin") {
      let id = req.params.id;
      let Query = { _id: id };
      let data = await TasksModel.deleteOne(Query);
      return { status: "success", data: data };
    }
    else {
      return { status: "fail", message: "Only admin can delete tasks" };
    }
  } catch (e) {
    return { status: "fail", message: "Something went wrong" };
  }
};

// Get Update Task
exports.getUpdateTask = async (req) => {
  try {
    let id = req.params.id;
    let Query = { _id: id };
    let data = await TasksModel.find(Query);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", message: "Something went wrong" };
  }
};

//  select task
exports.ListTaskByStatus = async (req, res) => {
  try {
    let status = req.params.status;
    let email = req.headers["email"];

    let result = await TasksModel.aggregate([
      { $match: { status: status, email: email } },

      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createdDate: {
            $dateToString: {
              date: "$createdDate",
              format: "%d-%m-%Y",
            },
          },
        },
      },
    ]);
    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};
