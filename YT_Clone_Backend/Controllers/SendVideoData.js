import { CommentModel } from "../SchemaModels/CommentModel.js";


export async function SendVideoData(req,res){
    try {
        let { token, user, videoId, videoData ,update,comment} = req.body;
        console.log(token, user, videoId, videoData ,update,comment);
        let checkIfExists = await CommentModel.find({videoID:videoId});
        if(!checkIfExists){
            res.status(404),json({message:'no comments to show'});
        }
        else{
            res.status(201).json(checkIfExists);

        }
        
    } catch (error) {
        console.log(error);
    }
    
}