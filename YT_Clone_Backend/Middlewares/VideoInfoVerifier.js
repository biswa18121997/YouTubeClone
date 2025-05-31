import { ChannelModel } from "../SchemaModels/ChannelModel.js";
import { CommentModel } from "../SchemaModels/CommentModel.js";
import { ProfileModel } from "../SchemaModels/ProfileModel.js";
import { UserModel } from "../SchemaModels/UserModel.js";
import { VideoModel } from "../SchemaModels/VideoModel.js";


export default async function VideoInfoVerifier( req, res){

    let { token, user, videoId, videoData ,update} = req.body;
    let checkVideo = await VideoModel.findOne({videoId});
    let checkChannel = await ChannelModel.findOne({channelId:videoData?.snippet?.channelId});
    let checkProfile = await ProfileModel.findOne({userID:user.email});
  //  let checkComments = await CommentModel.findOne({userID:userID});
console.log(videoData,"video data",videoData?.snippet?.title,videoData?.snippet?.description,videoData?.snippet?.channelTitle)
    if(update == 'increament like'){
       

        
    res.status(200).json({success:true});
}
