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
        if(checkVideo){
            await VideoModel.findOneAndUpdate({videoId},{ $inc: {likes:1}});
        }else{
            await VideoModel.create({videoId,
                tags: videoData?.snippet?.tags?.slice(0,5),
                likes: videoData?.items?.[0]?.statistics,
                comments:[], 
                videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                videoTitle:videoData?.snippet?.title, 
                videoDescription:videoData?.snippet?.description, 
                channelId: videoData?.snippet?.channelId})
        }

        if(checkProfile){
            await ProfileModel.findOneAndUpdate({userID:user.email},{  $push: {
            interests: videoData?.snippet?.tags?.slice(0, 5).join(' '),
            history: {
                videoId,
                tags: videoData?.snippet?.tags?.slice(0, 5),
                likes: videoData?.items?.[0]?.statistics,
                comments: [],
                videoThumbnail: videoData?.snippet?.thumbnails?.medium?.url,
                videoTitle: videoData?.snippet?.title,
                videoDescription: videoData?.snippet?.description,
                channelId: videoData?.snippet?.channelId
            },
            recentlyLikedVideos: {
                videoId,
                tags: videoData?.snippet?.tags?.slice(0, 5),
                likes: videoData?.items?.[0]?.statistics,
                comments: [],
                videoThumbnail: videoData?.snippet?.thumbnails?.medium?.url,
                videoTitle: videoData?.snippet?.title,
                videoDescription: videoData?.snippet?.description,
                channelId: videoData?.snippet?.channelId
            }
        }})
        }else{
            await ProfileModel.create({userID:user.userID, 
                name:user.name, 
                email:user.email, 
                interests :videoData?.snippet?.tags?.slice(0,2), 
                history:[{videoId,
                            tags: videoData?.snippet?.tags?.slice(0,5),
                            likes: videoData?.items?.[0]?.statistics,
                            comments:[], 
                            videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                            videoTitle:videoData?.snippet?.title, 
                            videoDescription:videoData?.snippet?.description, 
                            channelId: videoData?.snippet?.channelId}], 
                recentlyLikedVideos:[{videoId,
                                tags: videoData?.snippet?.tags?.slice(0,5),
                                likes: videoData?.items?.[0]?.statistics,
                                comments:[], 
                                videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                videoTitle:videoData?.snippet?.title, 
                                videoDescription:videoData?.snippet?.description, 
                                channelId: videoData?.snippet?.channelId}], 
                channels: [] })
        }

        if(checkChannel){
            let checkExistanceVideoOnChannel = await ChannelModel.findOne({channelId:videoData?.snippet?.channelId, "videos.videoId": videoId});
            if(!checkExistanceVideoOnChannel){
                await ChannelModel.updateOne({channelId:videoData?.snippet?.channelId},{  $push: {videos: {videoId,
                                tags: videoData?.snippet?.tags?.slice(0,5),
                                likes: videoData?.items?.[0]?.statistics,
                                comments:[], 
                                videoThumbnail:videoData?.items[0]?.snippet?.thumbnails?.medium?.url, 
                                videoTitle:videoData?.snippet?.title, 
                                videoDescription:videoData?.snippet?.description, 
                                channelId: videoData?.snippet?.channelId} }})
            }
            else {
                await ChannelModel.updateOne({channelId: videoData?.snippet?.channelId,"videos.videoId": videoId },
                                                {
                                                    $inc: { "videos.$.likes": 1 }
                                                });
                }
        }else{
            await ChannelModel.create({channelId:videoData?.snippet?.channelId,
                                        OwnerID:user?.email,
                                        channelTitle:videoData?.snippet?.channelTitle,
                                        tags:videoData?.snippet?.tags?.slice(0,2),
                                        videos:[{videoId,
                                                    tags: videoData?.snippet?.tags?.slice(0,5),
                                                    likes: videoData?.items?.[0]?.statistics,
                                                    comments:[], 
                                                    videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                    videoTitle:videoData?.snippet?.title, 
                                                    videoDescription:videoData?.snippet?.description, 
                                                    channelId: videoData?.snippet?.channelId
                                                }]
            })
        }
     
    }
    res.status(200).json({success:true});
}
