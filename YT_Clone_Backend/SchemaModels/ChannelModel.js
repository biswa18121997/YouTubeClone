import mongoose from 'mongoose'
import { videoSchema } from './VideoModel.js';

export const channelSchema= new mongoose.Schema({
    channelID:{
        type : String,
        required : true,
        unique : true,
        default : String(new Date().getTime())
    },
    tags:{
        type : [String]
    },
    channelName:{
        type : String,
    },
    OwnerID:{
        type : Number,
        required : true
    },
    channelDescription:{
        type : String,
        required : true, 

    },
    channelBanner :{
        type : String,
        required: true,
        default : 'https://eternitymarketing.com/assets/image-cache/blog/YouTubeCoverImage.8bc2171d.png'
    },
    subscribersCount:{
        type : Number
    },
    videos:{
        type : [videoSchema]
    }
});

export const ChannelModel = mongoose.model('channels',channelSchema);
