import { CommentModel } from "../SchemaModels/CommentModel.js";


export async function CommentUpdater(req,res){
    try {
        let { token, user, videoId, videoData ,update,comment} = req.body;
        console.log(token, user, videoId, videoData ,update,comment);
        let checkIfExists = await CommentModel.find({videoID:videoId});
        if(checkIfExists){
            res.status(201).json({checkIfExists});
        }else{
            await CommentModel.insertOne({videoID:videoId,userId:user.userID,comment:comment});
            let newComment = await CommentModel.find({videoID:videoId});
            return res.status(200).json({newComment});
        }    
    } catch (error) {
        console.log(error);
    }  
}