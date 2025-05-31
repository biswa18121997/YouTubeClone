import { VideoModel } from "../SchemaModels/VideoModel.js";
import { ProfileModel } from "../SchemaModels/ProfileModel.js";
import { CommentModel } from "../SchemaModels/CommentModel.js";


export async function VideoPageActions(req, res) {
    try {
        let {videoId , videoData, user, profile , token,comment} = req.body;
        console.log( user, token,comment , 'am i there?')
        
        if(req.body.update == 'increament like'){
            let findingVideo = await VideoModel.findOne({videoId:req.params.id});
            findingVideo ? await VideoModel.findOneAndUpdate({videoId} , {$inc : {likes: 1}}) 
                        : await VideoModel.insertOne({videoId:req.params.id,
                                                    tags: videoData?.snippet?.tags?.slice(0,5),
                                                    likes: videoData?.statistics.likeCount ,
                                                    comments:[], 
                                                    dislikes : 0 ,
                                                    videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                    videoTitle:videoData?.snippet?.title, 
                                                    videoDescription:videoData?.snippet?.description, 
                                                    channelId: videoData?.snippet?.channelId
                                                })
            let findingProfile = await ProfileModel.findOne({email : user.email})
            findingProfile ? await ProfileModel.findOneAndUpdate({email : user.email}, { $push : {recentlyLikedVideos : {videoId,
                                                                                                                        tags: videoData?.snippet?.tags?.slice(0,5),
                                                                                                                        likes: videoData?.statistics.likeCount ,
                                                                                                                        comments:[], 
                                                                                                                        dislikes : 0 ,
                                                                                                                        videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                                                                        videoTitle:videoData?.snippet?.title, 
                                                                                                                        videoDescription:videoData?.snippet?.description, 
                                                                                                                        channelId: videoData?.snippet?.channelId
                                                                                                                        },
                                                                                                    history : {videoId,
                                                                                                            tags: videoData?.snippet?.tags?.slice(0,5),
                                                                                                            likes: videoData?.statistics.likeCount ,
                                                                                                            comments:[], 
                                                                                                            dislikes : 0 ,
                                                                                                            videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                                                            videoTitle:videoData?.snippet?.title, 
                                                                                                            videoDescription:videoData?.snippet?.description, 
                                                                                                            channelId: videoData?.snippet?.channelId

                                                                                                        }}
                                                                                                }
                                                                                        
                                                                )
                            : ProfileModel.create({userID : user.userID,
                                                    name : user.name,
                                                    email : user.email,
                                                    interests : videoData?.snippet?.tags?.slice(0,2),
                                                    downloaded : [],
                                                    history : [{videoId,
                                                                tags: videoData?.snippet?.tags?.slice(0,5),
                                                                likes: videoData?.statistics.likeCount ,
                                                                comments:[], 
                                                                dislikes : 0 ,
                                                                videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                videoTitle:videoData?.snippet?.title, 
                                                                videoDescription:videoData?.snippet?.description, 
                                                                channelId: videoData?.snippet?.channelId
                                                            }],
                                                    recentlyLikedVideos : [{videoId,
                                                                            tags: videoData?.snippet?.tags?.slice(0,5),
                                                                            likes: videoData?.statistics.likeCount ,
                                                                            comments:[], 
                                                                            dislikes : 0 ,
                                                                            videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                            videoTitle:videoData?.snippet?.title, 
                                                                            videoDescription:videoData?.snippet?.description, 
                                                                            channelId: videoData?.snippet?.channelId
                                                                        }],
                                                    subscribedChannels : [],
                                                    channels : [],
                                                })
                                                

        }
        else if(req.body.update == 'increament dislike'){
            let findingVideo = await VideoModel.findOne({videoId});
            findingVideo ? await VideoModel.findOneAndUpdate({videoId} , {$inc : {dislikes: 1}}) 
                        : await VideoModel.insertOne({videoId,
                                                    tags: videoData?.snippet?.tags?.slice(0,5),
                                                    likes: videoData?.statistics,
                                                    dislikes : 1, 
                                                    comments:[], 
                                                    videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                    videoTitle:videoData?.snippet?.title, 
                                                    videoDescription:videoData?.snippet?.description, 
                                                    channelId: videoData?.snippet?.channelId})
        }
        
        else if(req.body.update == 'post comment'){
            let findingVideo = await VideoModel.findOne({videoId});
            findingVideo ? await VideoModel.findOneAndUpdate({videoId} , {$push : {comments: {videoID : videoId,
                                                                                                userId: user.userID,
                                                                                                comment : comment,
                                                                                            }
                                                                                }
                                                                         }
                                                            )
                        : await VideoModel.create({videoId,
                                                    tags: videoData?.snippet?.tags?.slice(0,5),
                                                    likes: videoData?.statistics.likeCount ,
                                                    comments:[{videoID : videoId,
                                                                userId: user.userID,
                                                                comment : comment}], 
                                                    dislikes : 0 ,
                                                    videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                    videoTitle:videoData?.snippet?.title, 
                                                    videoDescription:videoData?.snippet?.description, 
                                                    channelId: videoData?.snippet?.channelId}) ;
            await CommentModel.create({videoID : videoId,
                                    userId: user.userID,
                                    comment : comment});
        }

        else if(req.body.update == 'download'){
            let findingProfile = await ProfileModel.findOne({email : user.email})
            findingProfile ? await ProfileModel.findOneAndUpdate({email : user.email}, { $push :{downloaded : {videoId,
                                                                                                                tags: videoData?.snippet?.tags?.slice(0,5),
                                                                                                                likes: videoData?.statistics.likeCount ,
                                                                                                                comments:[], 
                                                                                                                dislikes : 0 ,
                                                                                                                videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                                                                videoTitle:videoData?.snippet?.title, 
                                                                                                                videoDescription:videoData?.snippet?.description, 
                                                                                                                channelId: videoData?.snippet?.channelId
                                                                                                            }
                                                                                                        }
                                                                                                }
                                                                )
                            : ProfileModel.create({userID : user.userID,
                                                    name : user.name,
                                                    email : user.email,
                                                    interests : videoData?.tags.slice(0,2),
                                                    downloaded : [{videoId,
                                                                tags: videoData?.snippet?.tags?.slice(0,5),
                                                                likes: videoData?.statistics.likeCount ,
                                                                comments:[], 
                                                                dislikes : 0 ,
                                                                videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                videoTitle:videoData?.snippet?.title, 
                                                                videoDescription:videoData?.snippet?.description, 
                                                                channelId: videoData?.snippet?.channelId
                                                            }],
                                                    history : [],
                                                    recentlyLikedVideos : [],
                                                    subscribedChannels : [],
                                                    channels : [],
                                                });
        }
        else if(req.body.update == 'subscribe'){
            await ProfileModel.findOneAndUpdate({email : user.email}, {$push : {subscribedChannels:{channelId :videoData.snippet.channelId ,
                                                                                        
                                                                                                channelTitle :videoData.snippet.channelTitle ,
                                                                                                

                                                                                    }}})
        }
    res.status(201).json({message : 'success'})
    }
    catch (error) {
        console.log(error , "this is the error");
    }
    
    
}