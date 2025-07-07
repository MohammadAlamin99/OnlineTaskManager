const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const TasksController = require("../controllers/TasksController");
const AuthVerificationMiddleware = require("../middlewares/AuthVerificationMiddleware");


router.post("/registration", UsersController.registration)
router.post("/userLogin", UsersController.userLogin)
router.post("/upadateProfile",AuthVerificationMiddleware, UsersController.upadateProfile)
router.get("/userDetails",AuthVerificationMiddleware, UsersController.userDetails)
// profile details
router.get("/profileDetails",AuthVerificationMiddleware, UsersController.profileDetails)
router.post("/upadateProfile",AuthVerificationMiddleware, UsersController.upadateProfile)

// createing task
router.post("/createTask",AuthVerificationMiddleware, TasksController.taskCreate)
router.get("/getTaskController/:status",AuthVerificationMiddleware, TasksController.getTaskController)
router.get("/getAllTask",AuthVerificationMiddleware, TasksController.getAllTaskController)
router.get("/taskById",AuthVerificationMiddleware, TasksController.taskById)
router.get("/getInprogress/:status",AuthVerificationMiddleware, TasksController.getInprogressController)
router.get("/getComplete/:status",AuthVerificationMiddleware, TasksController.getCompleteController)
router.post("/taskUpdate",AuthVerificationMiddleware, TasksController.taskUpdate)
router.delete("/taskDelete/:id",AuthVerificationMiddleware, TasksController.taskDelete)
router.get("/getTask/:id",AuthVerificationMiddleware, TasksController.getTask)
router.get("/totalCounTask/:status",AuthVerificationMiddleware, TasksController.totalCounTask);
router.get("/getTeamTask/:id",AuthVerificationMiddleware, TasksController.getTeamTask);


router.get("/teamWorkList/:id",AuthVerificationMiddleware, TasksController.teamWorkList)
router.get("/updateStatus/:id/:status",AuthVerificationMiddleware, TasksController.updateStatus)


router.get("/listByStatus/:status",AuthVerificationMiddleware, TasksController.listByStatus)
router.get("/listTaskCount",AuthVerificationMiddleware, TasksController.listTaskCount)


// recovery
router.get("/emailVerify/:email", UsersController.verifyEmail)
router.get("/otpVerify/:email/:otp", UsersController.verifyOtp)
router.post("/setNewPass", UsersController.setNewPass)

module.exports = router;