import mongoose from 'mongoose'
import { videoSchema } from './VideoModel.js';

export const channelSchema= new mongoose.Schema({
    channelId:{
        type : String,
        required : true,
        // unique : true ,
        default : String(new Date().getTime())
    },
    tags:{
        type : [String],
        required : false,
        default : []
    },
    channelName:{
        type : String,
    },
    OwnerID:{
        type : String,
        required : true,
        
    },
    channelDescription:{
        type : String,
        required : true, 
        default : 'Youtube_Clone_Channel to kepp you entertained and informative..!'
    },
    channelBanner :{
        type : String,
        default : 'https://eternitymarketing.com/assets/image-cache/blog/YouTubeCoverImage.8bc2171d.png'
    },
    subscribersCount:{
        type : Number,
        default : 0,
    },
    videos:{
        type : [videoSchema],
        default : []
    }
});

export const ChannelModel = mongoose.model('channels',channelSchema);
