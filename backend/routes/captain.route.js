const express = require("express")
const router = express.Router()
const captainController = require("../controllers/captain.controller")
const {body}= require("express-validator")

router.post("/register", [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be atleast 3 character long"),
    body("password").isLength({ min: 8 }).withMessage("Password must be atleast 8 character long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("color  must be atleast 3 character long"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("plate  must be atleast 3 character long"),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage("min one capacity should be there !!"),
    body("vehicle.vehicleType").isIn(["car","motercycle",'auto']).withMessage("Invalid vehicle !!"),
    
],captainController.registerCaptain)

module.exports= router