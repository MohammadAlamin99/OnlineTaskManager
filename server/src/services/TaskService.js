const TasksModel = require("../models/TasksModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Create tasks

exports.CreateTask = async (req) => {
  try {
    if (req.headers["role"] === "admin") {
      let reqBody = req.body;
      reqBody.email = req.headers["email"];

      let data = await TasksModel.create(reqBody);
      return { status: "success", data: data };
    }
    else {
      return { status: "fail", message: "Only admin can create tasks" };
    }
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};


// geting todo task
exports.getTaskService = async (req) => {
  try {
    let status = req.params.status;
    let email = req.headers["email"];
    let data = await TasksModel.aggregate([
      { $match: { status: status, email: email } },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "assignInfo",
        },
      },
      {
        $project: {
          "assignInfo._id": 0,
          "assignInfo.password": 0,
          "assignInfo.createdDate": 0,
        },
      },
    ]);
    return { status: "Success", data: data };
  } catch (e) {
    return { status: "fail", message: e };
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

// geting In Progress task
exports.getInprogressTaskService = async (req) => {
  try {
    let status = req.params.status;
    let email = req.headers["email"];
    let data = await TasksModel.aggregate([
      { $match: { status: status, email: email } },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "assignInfo",
        },
      },
      {
        $project: {
          "assignInfo._id": 0,
          "assignInfo.password": 0,
          "assignInfo.createdDate": 0,
        },
      },
    ]);
    return { status: "Success", data: data };
  } catch (e) {
    return { status: "fail", message: e };
  }
};

// geting Complete task
exports.getCompleteTaskService = async (req) => {
  try {
    let status = req.params.status;
    let email = req.headers["email"];
    let data = await TasksModel.aggregate([
      { $match: { status: status, email: email } },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "assignInfo",
        },
      },
      {
        $project: {
          "assignInfo._id": 0,
          "assignInfo.password": 0,
          "assignInfo.createdDate": 0,
        },
      },
    ]);
    return { status: "Success", data: data };
  } catch (e) {
    return { status: "fail", message: e };
  }
};

// update Task

exports.updaeTask = async (req) => {
  try {
    if (req.headers.role === "admin") {
      let reqBody = req.body;
      let id = req.body.id;
      let Query = { _id: id };
      let data = await TasksModel.updateOne(Query, reqBody);
      return { status: "success", data: data };
    }
    else {
      return { status: "fail", message: "Only admin can update tasks" };
    }
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

exports.ListTaskCount = async (req, res) => {
  try {
    let email = req.headers["email"];
    let result = await TasksModel.aggregate([
      { $match: { email: email } },
      { $group: { _id: "$status", total: { $count: {} } } },
    ]);
    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};

// Total task Count
exports.TotalTaskCount = async (req, res) => {
  try {
    let email = req.headers["email"];
    let status = req.params.status;
    let result = await TasksModel.aggregate([
      { $match: { email: email, status: status } },
      { $group: { _id: "$status", total: { $count: {} } } },
    ]);
    return { status: "Success", data: result };
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};

// Team task get
exports.TeamTaskGet = async (req) => {
  try {
    let id = req.params.id;
    let ObjectId = new mongoose.Types.ObjectId(id);
    let result = await TasksModel.aggregate([
      { $match: { users: { $elemMatch: { $eq: ObjectId } } } },
    ]);
    return { status: "success", message: result };
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};
