import mongoose from 'mongoose'
import { channelSchema } from './ChannelModel.js';
import { videoSchema } from './VideoModel.js';

const profileSchema= new mongoose.Schema({
    userID:{
        type: Number,
        required : true,
        unique : true, 
    },
    name : {
        type: Number,
        required : true,
    },
    email: {
        type: String,
        required : true,
        unique : true, 
    },
    interests:{
        type: [String],
    },
    downloaded:{
        type : [videoSchema]
    },
    history:{
        type : [videoSchema]
    },
    recentlyLikedVideos:{
         type : [videoSchema]
    },
    subscribedChannels:{
        type : [channelSchema]
    },
    channels:{
        type : [channelSchema]
    }
});

export const ProfileModel = mongoose.model('profiles', profileSchema);
