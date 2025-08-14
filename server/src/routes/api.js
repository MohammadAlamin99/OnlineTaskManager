const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const TasksController = require("../controllers/TasksController");
const AuthVerificationMiddleware = require("../middlewares/AuthVerificationMiddleware");
const upload = require("../middlewares/uploadAssests");
const { getNotification, markAsRead } = require("../services/NotificationService");


router.post("/registration", UsersController.registration)
router.post("/userLogin", UsersController.userLogin)
router.post("/upadateProfile", AuthVerificationMiddleware, UsersController.upadateProfile)
router.post("/updateUser", AuthVerificationMiddleware, UsersController.updateUser)
router.get("/userDetails", AuthVerificationMiddleware, UsersController.userDetails)
// profile details
router.get("/profileDetails", AuthVerificationMiddleware, UsersController.profileDetails)
router.post("/upadateProfile", AuthVerificationMiddleware, UsersController.upadateProfile)

// createing task
router.post("/createTask", AuthVerificationMiddleware, upload.array("assets", 5), TasksController.taskCreate)
router.get("/getTaskController/:status", AuthVerificationMiddleware, TasksController.getTaskController)
router.get("/getAllTask", AuthVerificationMiddleware, TasksController.getAllTaskController)
router.get("/taskById", AuthVerificationMiddleware, TasksController.taskById)
router.get("/getInprogress/:status", AuthVerificationMiddleware, TasksController.getInprogressController)
router.get("/getComplete/:status", AuthVerificationMiddleware, TasksController.getCompleteController)
router.post("/taskUpdate", AuthVerificationMiddleware, TasksController.taskUpdate)
router.delete("/taskDelete/:id", AuthVerificationMiddleware, TasksController.taskDelete)
router.get("/getTask/:id", AuthVerificationMiddleware, TasksController.getTask)
router.get("/totalCounTask/:status", AuthVerificationMiddleware, TasksController.totalCounTask);
router.get("/getTeamTask/:id", AuthVerificationMiddleware, TasksController.getTeamTask);
router.get("/updateStatus/:id/:status", AuthVerificationMiddleware, TasksController.updateStatus);

// notification
router.get("/notification", AuthVerificationMiddleware, getNotification);
router.post("/markAsRead", AuthVerificationMiddleware, markAsRead);

// recovery
router.get("/emailVerify/:email", UsersController.verifyEmail)
router.get("/otpVerify/:email/:otp", UsersController.verifyOtp)
router.post("/setNewPass", UsersController.setNewPass)

module.exports = router;