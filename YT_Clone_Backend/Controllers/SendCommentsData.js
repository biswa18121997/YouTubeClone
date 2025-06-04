import { CommentModel } from "../SchemaModels/CommentModel.js";

//controller function that sends comments data..
export async function SendCommentsData(req,res){
    try {
        let commentsInfo = await CommentModel.find({videoID: req.params.id});
        if(commentsInfo){
            return res.status(201).json({commentsInfo});
        }else{
           
            return res.status(200).json({message : 'no comments to show'});
        }    
    } catch (error) {
        console.log(error);
    }  
}