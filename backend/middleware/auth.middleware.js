const userModel = require('../models/user.model')
const blacklistModel= require("../models/blacklist.model")
const jwt = require("jsonwebtoken")
const captainModel = require('../models/caption.model')

module.exports.authUser = async (req, res, next)=>{
    // const token = req.cookies.token || req.headers.authorization.split(" ")[1]
    const token =req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({message:"unauthorized"})
    }
    const isBlacklisted = await blacklistModel.findOne({token:token} )
    if (isBlacklisted) {
        return res.status(401).json({message:"unauthorized blacklisted !!"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_Secret)
        const user = await userModel.findById(decoded._id)

        req.user = user
        return next()
        
    } catch (error) {
        return res.status(401).json({message:"unauthorized"})
    }
}
module.exports.authCaptain = async (req, res, next)=>{
    // const token = req.cookies.token || req.headers.authorization.split(" ")[1]
    const token =req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({message:"unauthorized"})
    }
    const isBlacklisted = await blacklistModel.findOne({token:token} )
  
    if (isBlacklisted) {
        return res.status(401).json({message:"unauthorized blacklisted !!"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_Secret)
        console.log(decoded)
        const captain = await captainModel.findById(decoded._id)
         console.log(captain)
        req.captain =  captain
        return next()
        
    } catch (error) {
        return res.status(401).json({message:"unauthorized"})
    }
}