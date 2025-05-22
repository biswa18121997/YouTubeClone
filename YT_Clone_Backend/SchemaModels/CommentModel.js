import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
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
     default :new Date
    }
});

export const CommentModel = mongoose.model('comments',commentSchema);