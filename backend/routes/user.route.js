const express = require("express");
const router = express.Router();
const { body } = require("express-validator")
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware")


//register
router.post("/register", [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
], userController.registerUser);

//login
router.post("/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
], userController.loginUser)

//profile
router.get("/profile", authMiddleware.authUser, userController.getUserProfile)

//logout
router.get("/logout",authMiddleware.authUser,userController.logoutUser )
 
 
module.exports = router; 
