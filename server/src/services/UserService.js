
const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken")

// Registration

exports.UserRegistration = async (req) => {
    try {
        let reqBody = req.body;
        await UsersModel.create(reqBody);
        return {status:"success", message:"regestaration successfully"}
    } catch (e) {
        return {status:"fail", message:e}
    }
}


// User LogIn
exports.UserLogin = async (req)=>{
    try {
        let reqBody = req.body;
        let data = await UsersModel.aggregate([
            {$match:reqBody},
            {$project:{"password":0,"createdDate":0 }}
        ])
        if(data.length>0){
           let payload = {exp: Math.floor(Date.now() / 1000) + (24*60*60),data:data[0]['email']};  //token create process
           let token = jwt.sign(payload, 'bcd123');
           return({status:"success",token:token, data:data[0]})
        }
        else{
            return {status:"fail", message:"something went wrong"}
        }

    } catch (e) {
        console.log(e)
        return {status:"fail", message:"something went wrong"}
    }
}

// Profile update
exports.UpadateProfile = async (req, res)=>{
    try {
        let email = req.headers['email'];
        let reqBody = req.body;
        let data = await UsersModel.updateOne({email:email},reqBody);
        return({status:"success", data:data});

    } catch (e) {
        console.log(e)
        return {status:"fail", message:"something went wrong"}
    }
}


// Profile Details 
exports.UserProfileDetails = async (req)=>{
    try {
        let email = req.headers['email'];
        let data = await UsersModel.aggregate([
            {$match:{email:email}},
            {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
        ])
        return({status:"success", data:data});

    } catch (e) {
        return {status:"fail", message:"something went wrong"}
    }
}

// Find user details
exports.findUser = async (req) => {
    try {
        let data = await UsersModel.find();
        return {status:"success", data:data}
    } catch (e) {
        return {status:"fail", message:e}
    }
}
