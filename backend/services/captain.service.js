const captainModel = require("../models/caption.model")

module.exports.createCaptain = async ({
    firstName,lastName,email,password,color,status,plate,capacity,vehicleType
}) => {
    if (!firstName|| !email || !password ||!color|| !plate || !capacity || !vehicleType) {
        throw new Error("all fields are required")
    }
    const  captain = await captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        status,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain
}