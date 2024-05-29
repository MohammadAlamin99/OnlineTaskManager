
const { DeleteTask, TaskStatusUpdate, ListTaskByStatus, ListTaskCount, TeamWorkList, getTaskService, CreateTask, getInprogressTaskService, getCompleteTaskService } = require("../services/TaskService");

exports.taskCreate = async (req, res) => {
    let result = await CreateTask(req);
    return res.status(200).json(result);
}


exports.deleteTask = async (req, res) => {
    let result = await DeleteTask(req);
    return res.status(200).json(result);
 }



exports.updateStatus = async (req, res) => {
    let result = await TaskStatusUpdate(req);
    return res.status(200).json(result);
 }

//  select status by status
exports.teamWorkList = async (req, res) => {
    let result = await TeamWorkList(req);
    return res.status(200).json(result);
 }

exports.listByStatus = async (req, res) => {
    let result = await ListTaskByStatus(req);
    return res.status(200).json(result);
 }

//  status counting
exports.listTaskCount = async (req, res) => {
    let result = await ListTaskCount(req);
    return res.status(200).json(result);
 }
//  task read 
exports.getTaskController = async (req, res) => {
    let result = await getTaskService(req);
    return res.status(200).json(result);
 }
//  get Inprogress Task
exports.getInprogressController = async (req, res) => {
    let result = await getInprogressTaskService(req);
    return res.status(200).json(result);
 }
//  get Inprogress Task
exports.getCompleteController = async (req, res) => {
    let result = await getCompleteTaskService(req);
    return res.status(200).json(result);
 }