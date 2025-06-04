import { ChannelModel } from "../SchemaModels/ChannelModel.js";
import { ProfileModel } from "../SchemaModels/ProfileModel.js";
import { VideoModel } from "../SchemaModels/VideoModel.js";

//controller function for updating db with the newly watched video views and channels creation and profile initialization..
export async function SendDataToDb(req, res) {

    try {
        let {videoId, user, videoData } = req.body;
        let snippet = videoData?.snippet;
        let statistics = videoData?.statistics;
        let checkVideo = await VideoModel.findOne({videoId: req.params.id});
        if(!checkVideo){
            //creating video if not already present..
            await VideoModel.create({videoId,
                                    tags: snippet?.tags?.slice(0, 5),
                                    likes: statistics?.likeCount || 0,
                                    views : statistics?.viewCount ,
                                    comments: [],
                                    videoThumbnail: snippet?.thumbnails?.medium?.url,
                                    videoTitle: snippet?.title,
                                    videoDescription: snippet?.description,
                                    channelId: snippet?.channelId,
                                    createdOn : snippet?.publishedAt
                                })
        }
        //creating channel if not already present..
        let checkChannel = await ChannelModel.findOne({channelId : snippet?.channelId})
        if(!checkChannel){
            await ChannelModel.create({channelId: snippet?.channelId,
                                       OwnerID :  snippet?.channelId,
                                        channelTitle: snippet?.channelTitle,
                                        tags : snippet?.tags?.slice(0,2),
                                        subscribersCount : 0,
                                        videos :[{videoId,
                                                tags: snippet?.tags?.slice(0, 5),
                                                likes: statistics?.likeCount || 0,
                                                comments: [],
                                                views : statistics?.viewCount,
                                                videoThumbnail: snippet?.thumbnails?.medium?.url,
                                                videoTitle: snippet?.title,
                                                videoDescription: snippet?.description,
                                                channelId: snippet?.channelId,
                                                createdOn : snippet?.publishedAt
                                            }]
            })
        }
        else{
            let checkForVideoOnChannel = await ChannelModel.findOne({channelId : snippet?.channelId,'videos.videoId' : req.params.id});
            if(!checkForVideoOnChannel)
                await ChannelModel.findOneAndUpdate({channelId : snippet?.channelId,'videos.videoId' : req.params.id}, {push :{videos :{videoId,
                                                                                                                                    tags: snippet?.tags?.slice(0, 5),
                                                                                                                                    likes: statistics?.likeCount || 0,
                                                                                                                                    comments: [],
                                                                                                                                    views : statistics?.viewCount,
                                                                                                                                    videoThumbnail: snippet?.thumbnails?.medium?.url,
                                                                                                                                    videoTitle: snippet?.title,
                                                                                                                                    videoDescription: snippet?.description,
                                                                                                                                    channelId: snippet?.channelId,
                                                                                                                                    createdOn : snippet?.publishedAt}}})
            else{
                await ChannelModel.findOneAndUpdate({channelId: snippet?.channelId, 'videos.videoId': req.params.id },{ $inc: { 'videos.$.views': 1 } });
            }
            
        }
        //creating profile if not already there..
    let profileCheck = await ProfileModel.findOne({email : user?.email})
    if(!profileCheck){
        await ProfileModel.create({userID:user?.userID ,
                                name : user?.name ,
                                email : user?.email,
                                interests : snippet?.tags?.slice(0,2),
                                downloaded : [],
                                history : [{videoId,
                                            tags: snippet?.tags?.slice(0, 5),
                                            likes: statistics?.likeCount || 0,
                                            comments: [],
                                            views : statistics?.viewCount,
                                            videoThumbnail: snippet?.thumbnails?.medium?.url,
                                            videoTitle: snippet?.title,
                                            videoDescription: snippet?.description,
                                            channelId: snippet?.channelId,
                                            createdOn : snippet?.publishedAt}],
                                recentlyLikedVideos :[] ,
                                subscribedChannels :[] ,
                                channels : []
        })
    }
    else{
        await ProfileModel.findOneAndUpdate({email : user.email}, {$push :  {
                                                                            interests: {
                                                                                $each: snippet?.tags?.slice(0, 2) || [],
                                                                            },
                                                                            history: {
                                                                                videoId,
                                                                                tags: snippet?.tags?.slice(0, 5),
                                                                                likes: statistics?.likeCount || 0,
                                                                                comments: [],
                                                                                views: statistics?.viewCount,
                                                                                videoThumbnail: snippet?.thumbnails?.medium?.url,
                                                                                videoTitle: snippet?.title,
                                                                                videoDescription: snippet?.description,
                                                                                channelId: snippet?.channelId,
                                                                                createdOn: snippet?.publishedAt,
                                                                            },
                                                                            },})
    }
    return res.status(200).json({message : 'sucess'})

    } catch (error) {
        console.log(error)
    }
    
}
//export async function SendDataToDb(req,res) {
//     try {

//     let {videoId, token, user, videoData, profile } = req.body;
// let checkVideo = await VideoModel.find({videoId:req.params.id})
// let checkProfile = await ProfileModel.find({email: req.body.user.email});
// let checkChannel = await ChannelModel.find({OwnerID: req.body.user.email});
//         if(checkVideo.length > 0){
//             await VideoModel.findOneAndUpdate({videoId:req.params.id},{ $inc: {likes:1}});
//         }else{
//             await VideoModel.create({videoId,
//                 tags: videoData?.snippet?.tags?.slice(0,5),
//                 likes: videoData?.statistics.likeCount,
//                 comments:[], 
//                 videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
//                 videoTitle:videoData?.snippet?.title, 
//                 videoDescription:videoData?.snippet?.description, 
//                 channelId: videoData?.snippet?.channelId})
//         }
// console.log('video created..');
//         if(checkProfile.length > 0){
//             await ProfileModel.findOneAndUpdate({userID:req.body.user.userID},{  $push: {
//             interests: req?.body?.videoData?.snippet?.tags?.slice(0, 3).join(','),
//             history: {
//                 videoId:req.params.id,
//                 tags: req?.body?.videoData?.snippet?.tags?.slice(0, 5),
//                 likes: req?.body?.videoData?.items?.[0]?.statistics,
//                 comments: [],
//                 videoThumbnail: req?.body?.videoData?.snippet?.thumbnails?.medium?.url,
//                 videoTitle: req?.body?.videoData?.snippet?.title,
//                 videoDescription: req?.body?.videoData?.snippet?.description,
//                 channelId: req?.body?.videoData?.snippet?.channelId
//             },
//         },
//         })
//         }else{
//             await ProfileModel.create({userID:user.userID, 
//                 name:user.name, 
//                 email:user.email, 
//                 interests :videoData?.snippet?.tags?.slice(0,2), 
//                 history:[{videoId,
//                             tags: videoData?.snippet?.tags?.slice(0,5),
//                             likes: videoData?.items?.[0]?.statistics,
//                             comments:[], 
//                             videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
//                             videoTitle:videoData?.snippet?.title, 
//                             videoDescription:videoData?.snippet?.description, 
//                             channelId: videoData?.snippet?.channelId}], 
//                 recentlyLikedVideos:[], 
//                 channels: [] })
//         }

// console.log('profile created')
//         if(checkChannel.length > 0){
//             let checkExistanceVideoOnChannel = await ChannelModel.findOne({channelId:req?.body?.videoData?.snippet?.channelId, "videos.videoId": req.params.id});
//             if(!checkExistanceVideoOnChannel){
//                 await ChannelModel.updateOne({channelId:req?.body?.videoData?.snippet?.channelId},{  $push: {videos: {videoId:req.params.id,
//                                 tags: req?.body?.videoData?.snippet?.tags?.slice(0,5),
//                                 likes: req?.body?.videoData?.items?.[0]?.statistics,
//                                 comments:[], 
//                                 videoThumbnail:req?.body?.videoData?.items?.[0]?.snippet?.thumbnails?.medium?.url, 
//                                 videoTitle:req?.body?.videoData?.snippet?.title, 
//                                 videoDescription:req?.body?.videoData?.snippet?.description, 
//                                 channelId: req?.body?.videoData?.snippet?.channelId} }})
//             }
       
//         }else{
//             await ChannelModel.create({channelId:videoData?.snippet?.channelId,
//                                         OwnerID:user?.email,
//                                         channelTitle:videoData?.snippet?.channelTitle,
//                                         tags:videoData?.snippet?.tags?.slice(0,2),
//                                         videos:[{videoId,
//                                                     tags: videoData?.snippet?.tags?.slice(0,5),
//                                                     likes: videoData?.items?.[0]?.statistics,
//                                                     comments:[], 
//                                                     videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
//                                                     videoTitle:videoData?.snippet?.title, 
//                                                     videoDescription:videoData?.snippet?.description, 
//                                                     channelId: videoData?.snippet?.channelId
//                                                 }]
//             })
//         }
// console.log('channel created');
//         // let commentsInThePage= await CommentModel.find({videoID:req.params.id})
//      return res.status(200).json({message : 'sucess'})
    
//     } catch (error) {
//         console.log(error)
//     }
// }// 