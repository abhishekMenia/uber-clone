const captainModel = require("../models/caption.model")
const { validationResult } = require("express-validator")
const { createCaptain } = require("../services/captain.service")
const blacklistModel= require("../models/blacklist.model")


module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    const { fullName, email, password, vehicle } = req.body
    
    const isCaptainPresent = await captainModel.findOne({ email })
    if (isCaptainPresent) {
        return res.status(400).json({message:"captain email already exists"})
    }

    const hashedPassword = await captainModel.hashPassword(password)
    
   const captain = await createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })

    return res.status(200).json({captain})

    
}

module.exports.loginCaptain = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }

    const { email, password } = req.body
    
    const captain = await captainModel.findOne({ email }).select("+password")
    
    if (!captain) {
        return res.status(401).json({status:false,message:"invalid email or password"})
    }
    const checkPassword= await captain.comparePassword(password)
    if (!checkPassword) {
        return res.status(401).json({status:false,message:"invalid email or password"})
    }
    const token = captain.generateAuthToken()

    return res.status(200).json({status:"true", message:"User successfully loggedIn",token,captain})

}

module.exports.getCaptainProfile = async (req, res) => {
    const captain = req.captain
    return res.status(200).json({message:"captain data fetched successfully",captain})
    
}
module.exports.logoutCaptain = async (req,res) => {
    const token = req.headers.authorization?.split(" ")[1]
    const findToken= await blacklistModel.findOne({token})
    if (findToken) {
        return res.status(400).json({message:"Already logged out"})
    }
    await blacklistModel.create({
        token:token
    })
    return res.status(200).json({message:"user logged out successfully"})
}