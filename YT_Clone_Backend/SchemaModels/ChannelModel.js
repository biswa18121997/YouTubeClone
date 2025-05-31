import mongoose from 'mongoose'
import { videoSchema } from './VideoModel.js';

export const channelSchema= new mongoose.Schema({
    channelId:{
        type : String,
        required: true,
        default : () => String(Date.now()),
        
    },
    OwnerID:{
        type : String,
        required : true, 
        default : ()=> new Date().getTime()       
    },
    channelTitle:{
        type : String,
        required: true,
    },
    tags:{
        type : [String],
        required : false,
        default : []
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
        required: true
    },
    videos:{
        type : [videoSchema],
        default : [],
        required: true
    }
});

export const ChannelModel = mongoose.model('channels',channelSchema);
