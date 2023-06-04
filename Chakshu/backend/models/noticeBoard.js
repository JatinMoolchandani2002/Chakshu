const mongoose = require('mongoose')

const noticeBoardSchema = new mongoose.Schema({
        userName:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'SuperUsers',
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
        noticeType:{
            type:String,
            required:true
        },
        severity:{
            type:String,
            required:true
        },
        media:{
            type:Array,
            required:false
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    {
        collection:'NoticeBoards'
    }
)

const NoticeBoard = mongoose.model('NoticeBoards', noticeBoardSchema)

const checkNoticeExits = async(noticeId)=>{
    const result = await NoticeBoard.findOne({_id:noticeId})
    return result
}

module.exports = {
    NoticeBoard,
    checkNoticeExits
}