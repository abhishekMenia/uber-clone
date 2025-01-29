const userModel = require('../models/user.model')
const blacklistModel= require("../models/blacklist.model")
const jwt = require("jsonwebtoken")

module.exports.authUser = async (req, res, next)=>{
    // const token = req.cookies.token || req.headers.authorization.split(" ")[1]
    const token =req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({message:"unauthorized"})
    }
     console.log("token :",token)
    const isBlacklisted = await blacklistModel.findOne({token:token} )
      console.log("isBlacklisted :",isBlacklisted)
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