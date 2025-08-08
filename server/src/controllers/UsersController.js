
const { UserRegistration, UserLogin, UpadateProfile, UserProfileDetails, RecoveryEmailVerify, RecoveryVerifyOTP, RecoveryNewPassword, findUser } = require("../services/UserService");

exports.registration = async (req, res) => {
   let result = await UserRegistration(req);
   return res.status(200).json(result);
}

// user login
exports.userLogin = async (req, res) => {
   let result = await UserLogin(req);
   return res.status(200).json(result);
}

// update Profile
exports.upadateProfile = async(req, res)=>{
   let result = await UpadateProfile(req);
   return res.status(200).json(result);
}


// user Profile details
exports.profileDetails = async(req, res)=>{
   let result = await UserProfileDetails(req);
   return res.status(200).json(result);
}

// find userDetails
exports.userDetails = async(req, res)=>{
   let result = await findUser(req);
   return res.status(200).json(result);
}





// Recover verify email
exports.verifyEmail = async(req, res)=>{
   let result = await RecoveryEmailVerify(req);
   return res.status(200).json(result);
}


// Recover verify otp
exports.verifyOtp = async(req, res)=>{
   let result = await RecoveryVerifyOTP(req);
   return res.status(200).json(result);
}

// Recover set new password
exports.setNewPass = async(req, res)=>{
   let result = await RecoveryNewPassword(req);
   return res.status(200).json(result);
}
