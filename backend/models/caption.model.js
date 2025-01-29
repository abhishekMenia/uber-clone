const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt= require("bcrypt")

const captainSchema = new mongoose.Schema({

    fullName: {
        firstName: {
            type: String,
            required:true,
            minlength: [3, "min length should be 3"],
        },
        lastName: {
            type: String,
            minlength:[3,"min length should be 3"]
        }
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        select: false, // so that each time we find this schema this pasword field is not send
        minlength: [8, "min length should be 8"],
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
      default:"active"
    },
    vehicle: {
        color: {
            type: String,
            required:true
        },
        plate: {
            type: String,
            required:true
        },
        capacity: {
            type: Number,
            required: true,
            minlength:[1,'capacity must be atleast 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum:["car","motercycle",'auto']
        }
       
    }
    
})

captainSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_Secret, { expiresIn: "24h" })
    return token;
}

captainSchema.methods.comparePassword = async (password) => {
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password,10) 
}

const captainModel = mongoose.model("caption", captainSchema)

module.exports=captainModel