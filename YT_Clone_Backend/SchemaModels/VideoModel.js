import mongoose from 'mongoose'
import { commentSchema } from './CommentModel.js';

export const videoSchema= new mongoose.Schema({
    videoId:{
        type: String,
        unique : true,
        required : true,
    },
    tags:{
        type : [String],
    },
    comments:{
        type : [commentSchema]
    },
    likes:{
        type : Number
    },
    dislikes:{
        type : Number
    },
    videoThumbnail:{
        type:String

    },
    videoTitle:{
        type: String,

    },
    videoDescription:{
        type: String,

    },
    channelId:{
        type : String
    }
    
});

export const VideoSchema = mongoose.model('videos', videoSchema);
