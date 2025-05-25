import { ChannelModel } from "../SchemaModels/ChannelModel.js";
import { CommentModel } from "../SchemaModels/CommentModel.js";
import { ProfileModel } from "../SchemaModels/ProfileModel.js";
import { UserModel } from "../SchemaModels/UserModel.js";
import { VideoModel } from "../SchemaModels/VideoModel.js";


export default async function VideoInfoVerifier( req, res, next ){

    let {update, videoId, tags, interests, userID, likes, videoThumbnail, videoTitle, videoDescription, channelId, channelName} = req.body;
    let checkVideo = await VideoModel.findOne({videoId});
    let checkChannel = await ChannelModel.findOne({channelId});
    let checkUser = await UserModel.findOne({email:userID});
  //  let checkComments = await CommentModel.findOne({userID:userID});
    let checkProfile = await ProfileModel.findOne({});

    if(update == 'like'){
        if(checkVideo){
            await VideoModel.findOneAndUpdate({videoId},{ $inc: {likes:1}});
        }else{
            await VideoModel.create({videoId, tags, likes, comments:[], videoThumbnail, videoTitle, videoDescription, channelId})
        }

        if(checkProfile){
            await ProfileModel.findOneAndUpdate({channelId},{ $inc: {likes:1}});
        }else{
            await ProfileModel.create({userID, name:req.body.name, email:userID, interests, history:[checkVideo], recentlyLikedVideos:[checkVideo], channels: [] })
        }

        if(checkChannel){
            let checkExistanceVideoOnChannel = await ChannelModel.findOne({channelId, "videos.videoId": videoId});
            if(!checkExistanceVideoOnChannel){
                await ChannelModel.updateOne({channelId},{  $push: {videos: {videoId,tags,likes,userID,videoThumbnail,videoTitle,videoDescription,channelId} }})
            }
            else {
                await ChannelModel.create({channelId,tags,channelName,OwnerID: checkUser.email,channelDescription: channelName,videos: [    { videoId, tags, likes, userID, videoThumbnail, videoTitle,  videoDescription, channelId}]});
            }
        }
     
    

     


    }
}