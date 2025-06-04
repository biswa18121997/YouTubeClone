import mongoose from "mongoose";
//schema and models for comments..

export const commentSchema = new mongoose.Schema({
    commentID : {
        type : String,
        required : true,
        default : ()=>String(Date.now())
    },
    videoID:{
        type: String,
    },
    userId: {
        type : String
    },
    comment :{
        type : String
    },
    date :{
        type: Date,
     default :()=>new Date().getTime(),
     required : true
    }
});

export const CommentModel = mongoose.model('comments',commentSchema);