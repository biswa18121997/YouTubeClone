import mongoose from 'mongoose'
import { commentSchema } from './CommentModel.js';

export const videoSchema= new mongoose.Schema({
    videoId:{
        type: String,
       // unique : true,
        required : true,
        default: ()=>new Date().getTime()
    },
    tags:{
        type : [String],
        required : true,
        default : []
    },
    comments:{
        type : [commentSchema],
        default :[],
        required: true
    },
    likes:{
        type : Number,
        required : true,
        default : 0,
    },
    dislikes:{
        type : Number,
        required : true,
        default : 0
    },
    videoThumbnail:{
        type:String , 
        default :'https://img.freepik.com/premium-vector/red-youtube-logo-social-media-logo_197792-1803.jpg?semt=ais_hybrid&w=740'

    },
    videoTitle:{
        type: String,
        required:true

    },
    videoDescription:{
        type: String,
        required : true
    },
    channelId:{
        type : String,
        required: true
    }
    
});

export const VideoModel = mongoose.model('videos', videoSchema);
