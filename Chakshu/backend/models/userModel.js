const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        userName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        userType:{
            type:String,
            required:false,
            default:'Normal'
        },
        name:{
            firstName:{
                type:String,
                required:true
            },
            lastName:{
                type:String,
                required:true
            }
        },
        aadharNum:{
            type:String,
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
        collection:'Users'
    }
)

const User = mongoose.model('Users', userSchema)

const checkUserExists = async(userName)=>{
    const result = await User.findOne({userName:userName})
    return result
}

module.exports = {
    User,
    checkUserExists
}