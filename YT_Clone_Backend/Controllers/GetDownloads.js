import { ChannelModel } from "../SchemaModels/ChannelModel.js";
import { ProfileModel } from "../SchemaModels/ProfileModel.js";
import { VideoModel } from "../SchemaModels/VideoModel.js";
//controller function to get data for downloads page..
export async function GetDownloads(req, res) {
    try {
        let {user } = req.body;
        let searchProfile = await ProfileModel.findOne({email:user.email }) ;
        let searchChannel = await ChannelModel.find({OwnerID : user.email || user.userID});
        let searchVideos = await VideoModel.find({channelId : user.email});   
        return res.status(200).json({searchProfile, searchChannel, searchVideos});
    } catch (error) {
        
    }
    
}