const mongoose = require('mongoose')

const superUserSchema = new mongoose.Schema({
        userName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        userType:{
            type:String,
            enum:['Super Admin', 'Police', 'Media Agency'],
            required:true
        },
        contactNum:{
            type:String,
            required:true
        },
        address:{
            locality:{
                type:String,
                required:true
            },
            city:{
                type:String,
                required:true
            },
            state:{
                type:String,
                required:true
            },
            pincode:{
                type:Number,
                required:true
            },
        },
        profileIcon:{
            type:String,
            required:false
        },
        isBanned:{
            type:Boolean,
            required:false,
            default:false
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    {
        collection:'SuperUsers'
    }
)

const SuperUser = mongoose.model('SuperUsers', superUserSchema)

const checkSuperUserExists = async(userName)=>{
    const result = await SuperUser.findOne({userName:userName})
    return result
}

module.exports = {
    SuperUser,
    checkSuperUserExists
}