const mongoose = require('mongoose')

const crimePostSchema = new mongoose.Schema({
        userId:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Users',
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        crimeType:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        isWitness:{
            type:Boolean,
            default:false
        },
        severity:{
            type:String,
            required:true,
            default:'Low'
        },
        verification:{
            isVerified:{
                type:Boolean,
                required:true,
                default:false
            },
            verifiedBy:[
                {
                    userName:{
                        type:mongoose.SchemaTypes.ObjectId,
                        ref:'SuperUsers',
                        required:true
                    }
                }
            ]
        },
        reportedFakePost:[
            {
                userId:{
                    type:mongoose.SchemaTypes.ObjectId,
                    required:true
                },
                media:{
                    type:Array,
                    required:false
                },
                description:{
                    type:String,
                    required:true
                },
                isWitness:{
                    type:Boolean,
                    default:false
                }
            }
        ],
        supportPost:[
            {
                userId:{
                    type:mongoose.SchemaTypes.ObjectId,
                    required:true
                },
                media:{
                    type:Array,
                    required:false
                },
                description:{
                    type:String,
                    required:true
                },
                isWitness:{
                    type:Boolean,
                    default:false
                }
            }
        ],
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
            location:{
                type:Array,
                required:true
            }
        },
        media:{
            type:Array,
            required:true
        },
        isRemoved:{
            type:Boolean,
            default:false
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    {
        collection:'CrimePosts'
    }
)

const CrimePost = mongoose.model('CrimePosts', crimePostSchema)

const checkCrimePostExists = async(postId)=>{
    const result = await CrimePost.findOne({_id:postId})
    return result
}

module.exports = {
    CrimePost,
    checkCrimePostExists
}