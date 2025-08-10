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
      if (!data[0].isActive) {
        return { status: "fail", message: "User account has been deactivated, contact the administrator" };
      }
      let payload = { email: data[0]["email"], role: data[0]["role"] }; //token create process
      let token = jwt.sign(payload, "bcd123");
      return { status: "success", token: token, data: data[0] };
    } else {
      return { status: "fail", message: "Username or password invalid" };
    }
  } catch (e) {
    return { status: "fail", message: "Something went wrong !" };
  }
};

// Profile update

exports.UpadateProfile = async (req) => {
  try {
    let email = req.headers["email"];
    // password find 
    let user = await UsersModel.findOne({ email });

    let { oldPassword, password, ...reqbody } = req.body;
    if (password) {
      if (!oldPassword) {
        return { status: "fail", message: "Old password is required" };
      }
      if (user.password !== oldPassword) {
        return { status: "fail", message: "Old password is incorrect" };
      }

      reqbody.password = password;
    }

    let data = await UsersModel.updateOne(
      { email: email },
      { $set: reqbody },
      { upsert: true }
    );

    return { status: "success", data };
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
          isActive: 1,
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


// user update
exports.userUpdate = async (req) => {
  try {
    let reqBody = req.body;
    let id = reqBody.id;
    let data = await UsersModel.updateOne({ _id: id }, { $set: reqBody });
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};
