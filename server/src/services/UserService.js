const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");

// Registration
exports.UserRegistration = async (req) => {
  try {
    let reqBody = req.body;
    let adminCode = reqBody.adminCode;
    const code = process.env.adminKey;

    let role = adminCode === code ? "admin" : "member";
    reqBody.role = role;
    await UsersModel.create(reqBody);
    return { status: "Success", message: "Regestaration successfully" };
  } catch (e) {
    return { status: "fail", message: e };
  }
};

// User LogIn
exports.UserLogin = async (req) => {
  try {
    let reqBody = req.body;
    let data = await UsersModel.aggregate([
      { $match: reqBody },
      { $project: { password: 0, createdDate: 0 } },
    ]);

    if (data.length > 0) {
      let payload = { email: data[0]["email"], role: data[0]["role"] }; //token create process
      let token = jwt.sign(payload, "bcd123");
      return { status: "success", token: token, data: data[0] };
    } else {
      return { status: "fail", message: "something went wrong" };
    }
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};

// Profile update
exports.UpadateProfile = async (req) => {
  try {
    let email = req.headers["email"];
    let reqBody = req.body;
    let data = await UsersModel.updateOne({ email: email }, reqBody);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};

// Profile Details
exports.UserProfileDetails = async (req) => {
  try {
    let email = req.headers["email"];
    let data = await UsersModel.aggregate([
      { $match: { email: email } },
      {
        $project: {
          _id: 1,
          email: 1,
          name: 1,
          mobile: 1,
          photo: 1,
          role: 1,
          designation: 1,
        },
      },
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};

// Find user details
exports.findUser = async () => {
  try {
    let data = await UsersModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", message: e };
  }
};
