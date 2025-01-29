const captainModel = require("../models/caption.model")
const { validationResult } = require("express-validator")
const { createCaptain } = require("../services/captain.service")


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