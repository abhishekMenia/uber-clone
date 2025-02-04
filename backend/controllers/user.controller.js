const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  const hashedPassword = await userModel.hashPassword(password);

  const checkEmail = await userModel.findOne({ email });
  if (checkEmail) {
    return res.status(400).json({ message: "email already exists" });
  }

  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email: email,
    password: hashedPassword,
  });

  // const token = user.generateAuthToken()

  return res.status(200).json({ user: user });
  // return res.status(200).json({user:user,token:token})
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // here we used select("+password") so that password should be returned to user ,by defauld it is not, check in userModel
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res
      .status(401)
      .json({ status: "false", message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res
      .status(401)
      .json({ status: "false", message: "Invalid email or password" });
  }
  const token = user.generateAuthToken();

  return res
    .status(200)
    .json({
      status: "true",
      message: "User successfully loggedIn",
      token,
      user,
    });
};

module.exports.getUserProfile = async (req, res) => {
  const user = req.user;
  return res.status(200).json({ user });
};

module.exports.logoutUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const findToken = await blacklistModel.findOne({ token });
  if (findToken) {
    return res.status(400).json({ message: "Already logged out" });
  }
  await blacklistModel.create({
    token: token,
  });
  return res.status(200).json({ message: "user logged out successfully" });
};
