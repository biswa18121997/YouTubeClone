import { CommentModel } from "../SchemaModels/CommentModel.js";
//controller function to edit and delete comments..
export async function EditDeleteComment(req, res) {
    try {
        let {actionType, commentID,editComment, videoID} = req.body;
        if(actionType == 'edit'){
            let findComment =await CommentModel.findOne({commentID})
            await CommentModel.findOneAndUpdate({commentID},{$set: {comment : editComment || findComment.comment }})
        }
        else if(actionType == 'delete'){
            await CommentModel.findOneAndDelete({commentID});
        }
        let commentsInfo = await CommentModel.find({videoID});
        res.status(201).json({commentsInfo});  
    } catch (error) {
        console.log(error)
    }
}