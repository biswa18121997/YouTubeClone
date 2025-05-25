import mongoose from 'mongoose'
import { channelSchema } from './ChannelModel.js';
import { videoSchema } from './VideoModel.js';

const profileSchema= new mongoose.Schema({
    userID:{
        type: String,
        required : true,
        unique : true, 
    },
    name : {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required : true,
        unique : true, 
    },
    interests:{
        type: [String],
        required: true,
        default : []
    },
    downloaded:{
        type : [videoSchema],
       
        default : []
    },
    history:{
        type : [videoSchema],
        required: true,
        default : []
    },
    recentlyLikedVideos:{
         type : [videoSchema],
         required: true,
        default : []
    },
    subscribedChannels:{
        type : [channelSchema],
        required: true,
        default : []
    },
    channels:{
        type : [channelSchema],
        required: true,
        default : []
    }
});

export const ProfileModel = mongoose.model('profiles', profileSchema);
