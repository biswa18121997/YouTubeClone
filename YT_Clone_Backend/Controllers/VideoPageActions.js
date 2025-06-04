import { VideoModel } from "../SchemaModels/VideoModel.js";
import { ProfileModel } from "../SchemaModels/ProfileModel.js";
import { CommentModel } from "../SchemaModels/CommentModel.js";
import { ChannelModel } from "../SchemaModels/ChannelModel.js";

//controller function for likes, comments, suscribe, dislike that makes changes to db accordingly..
export async function VideoPageActions(req, res) {
    try {
        let {videoId , videoData, user, token,comment} = req.body;
        //increament like..
        if(req.body.update == 'increament like'){
            let findingVideo = await VideoModel.findOne({videoId:req.params.id});
            findingVideo ? await VideoModel.findOneAndUpdate({videoId} , {$inc : {likes: 1}}) 
                        : await VideoModel.insertOne({videoId:req.params.id,
                                                    tags: videoData?.snippet?.tags?.slice(0,5),
                                                    likes: videoData?.statistics?.likeCount ,
                                                    comments:[], 
                                                    views : videoData?.statistics?.viewCount,
                                                    dislikes : 0 ,
                                                    videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                    videoTitle:videoData?.snippet?.title, 
                                                    videoDescription:videoData?.snippet?.description, 
                                                    channelId: videoData?.snippet?.channelId,
                                                    createdOn : videoData?.snippet?.publishedAt
                                                })
                                                //making profile if not already there..
            let findingProfile = await ProfileModel.findOne({email : user.email})
            findingProfile ? await ProfileModel.findOneAndUpdate({email : user.email}, { $push : {recentlyLikedVideos : {videoId,
                                                                                                                        tags: videoData?.snippet?.tags?.slice(0,5),
                                                                                                                        likes: videoData?.statistics.likeCount ,
                                                                                                                        comments:[], 
                                                                                                                        views : videoData?.statistics?.viewCount,
                                                                                                                        dislikes : 0 ,
                                                                                                                        videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                                                                        videoTitle:videoData?.snippet?.title, 
                                                                                                                        videoDescription:videoData?.snippet?.description, 
                                                                                                                        channelId: videoData?.snippet?.channelId,
                                                                                                                        createdOn : videoData?.snippet?.publishedAt
                                                                                                                        },
                                                                                                    history : {videoId,
                                                                                                            tags: videoData?.snippet?.tags?.slice(0,5),
                                                                                                            likes: videoData?.statistics.likeCount ,
                                                                                                            comments:[], 
                                                                                                            views : videoData?.statistics?.viewCount,
                                                                                                            dislikes : 0 ,
                                                                                                            videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                                                            videoTitle:videoData?.snippet?.title, 
                                                                                                            videoDescription:videoData?.snippet?.description, 
                                                                                                            channelId: videoData?.snippet?.channelId,
                                                                                                            createdOn : videoData?.snippet?.publishedAt

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
                                                                views : videoData?.statistics?.viewCount,
                                                                dislikes : 0 ,
                                                                videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                videoTitle:videoData?.snippet?.title, 
                                                                videoDescription:videoData?.snippet?.description, 
                                                                channelId: videoData?.snippet?.channelId,
                                                                createdOn : videoData?.snippet?.publishedAt
                                                            }],
                                                    recentlyLikedVideos : [{videoId,
                                                                            tags: videoData?.snippet?.tags?.slice(0,5),
                                                                            likes: videoData?.statistics.likeCount ,
                                                                            comments:[], 
                                                                            views : videoData?.statistics?.viewCount,
                                                                            dislikes : 0 ,
                                                                            videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                            videoTitle:videoData?.snippet?.title, 
                                                                            videoDescription:videoData?.snippet?.description, 
                                                                            channelId: videoData?.snippet?.channelId,
                                                                            createdOn : videoData?.snippet?.publishedAt
                                                                        }],
                                                    subscribedChannels : [],
                                                    channels : [],
                                                })
                                                

        }
        //increamenting dislike..
        else if(req.body.update == 'increament dislike'){
            let findingVideo = await VideoModel.findOne({videoId});
            findingVideo ? await VideoModel.findOneAndUpdate({videoId} , {$inc : {dislikes: 1}}) 
                        : await VideoModel.insertOne({videoId,
                                                    tags: videoData?.snippet?.tags?.slice(0,5),
                                                    likes: videoData?.statistics,
                                                    dislikes : 1, 
                                                    comments:[], 
                                                    views : videoData?.statistics?.viewCount,
                                                    videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                    videoTitle:videoData?.snippet?.title, 
                                                    videoDescription:videoData?.snippet?.description, 
                                                    channelId: videoData?.snippet?.channelId,
                                                    createdOn : videoData?.snippet?.publishedAt})
        }
        //updating db of videos and comments..
        else if(req.body.update == 'post comment'){
            let findingVideo = await VideoModel.findOne({videoId});
            findingVideo ? await VideoModel.findOneAndUpdate({videoId} , {$push : {comments: {commentID : String(Date.now()),
                                                                                            videoID : videoId,
                                                                                            userId: user.userID,
                                                                                            comment : comment,
                                                                                            date : String(Date.now())
                                                                                            }
                                                                                }
                                                                         }
                                                            )
                        : await VideoModel.create({videoId,
                                                    tags: videoData?.snippet?.tags?.slice(0,5),
                                                    likes: videoData?.statistics.likeCount ,
                                                    comments:[{videoID : videoId,
                                                                commentID : String(Date.now()),
                                                                userId: user.userID,
                                                                comment : comment,
                                                                date : String(Date.now())}], 
                                                    dislikes : 0 ,
                                                    views : videoData?.statistics?.viewCount,
                                                    videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                    videoTitle:videoData?.snippet?.title, 
                                                    videoDescription:videoData?.snippet?.description, 
                                                    channelId: videoData?.snippet?.channelId,
                                                    createdOn : videoData?.snippet?.publishedAt}) ;
            await CommentModel.create({commentID : String(Date.now()),
                                    videoID : videoId,
                                    userId: user.userID,
                                    comment : comment,
                                    date : String(Date.now())
                                });
        }
//handling downloadss..
        else if(req.body.update == 'download'){
            let findingProfile = await ProfileModel.findOne({email : user.email})
            findingProfile ? await ProfileModel.findOneAndUpdate({email : user.email}, { $push :{downloaded : {videoId,
                                                                                                                tags: videoData?.snippet?.tags?.slice(0,5),
                                                                                                                likes: videoData?.statistics.likeCount ,
                                                                                                                comments:[], 
                                                                                                                views : videoData?.statistics?.viewCount,
                                                                                                                dislikes : 0 ,
                                                                                                                videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                                                                videoTitle:videoData?.snippet?.title, 
                                                                                                                videoDescription:videoData?.snippet?.description, 
                                                                                                                channelId: videoData?.snippet?.channelId,
                                                                                                                createdOn : videoData?.snippet?.publishedAt
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
                                                                views : videoData?.statistics?.viewCount,
                                                                dislikes : 0 ,
                                                                videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                videoTitle:videoData?.snippet?.title, 
                                                                videoDescription:videoData?.snippet?.description, 
                                                                channelId: videoData?.snippet?.channelId,
                                                                createdOn : videoData?.snippet?.publishedAt
                                                            }],
                                                    history : [],
                                                    recentlyLikedVideos : [],
                                                    subscribedChannels : [],
                                                    channels : [],
                                                });
        }
        //handling subscribe..
        else if(req.body.update == 'subscribe'){
            await ProfileModel.findOneAndUpdate({email : user.email}, {$push : {subscribedChannels:{channelId :videoData?.snippet?.channelId ,
                                                                                                    OwnerID: videoData?.snippet?.channelTitle,
                                                                                                    channelTitle :videoData?.snippet?.channelTitle ,
                                                                                                    tags : videoData?.snippet?.tags?.slice(0,2),
                                                                                                    channelDescription: videoData?.snippet?.channelTitle,
                                                                                                    channelBanner : 'https://eternitymarketing.com/assets/image-cache/blog/YouTubeCoverImage.8bc2171d.png',
                                                                                                    subscribersCount: 0,
                                                                                                    videos:[{videoId,
                                                                                                        tags: videoData?.snippet?.tags?.slice(0,5),
                                                                                                        likes: videoData?.statistics.likeCount ,
                                                                                                        comments:[], 
                                                                                                        views : videoData?.statistics?.viewCount,
                                                                                                        dislikes : 0 ,
                                                                                                        videoThumbnail:videoData?.snippet?.thumbnails?.medium?.url, 
                                                                                                        videoTitle:videoData?.snippet?.title, 
                                                                                                        videoDescription:videoData?.snippet?.description, 
                                                                                                        channelId: videoData?.snippet?.channelId,
                                                                                                        createdOn : videoData?.snippet?.publishedAt}]

                                                                                    }}});
            await ChannelModel.findOneAndUpdate({channelId : videoData?.snippet?.channelId},{$inc : {subscribersCount:1}});
        }
    //finally sending data......
    let videoInfo = await VideoModel.find({videoId: req.params.id});
    let commentsInfo = await CommentModel.find({videoID : req.params.id});
    let channelInfo = await ChannelModel.find({channelId :videoData?.snippet?.channelId })
    res.status(201).json({message : 'success',
                        commentsInfo,
                            videoInfo, channelInfo
                        })
    }
    catch (error) {
        console.log(error , "this is the error");
    }
    
    
}