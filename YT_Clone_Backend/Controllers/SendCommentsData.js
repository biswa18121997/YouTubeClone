import { CommentModel } from "../SchemaModels/CommentModel.js";


export async function SendCommentsData(req,res){
    try {
            
        // console.log('send comments data starts.')
        // console.log("is this??", req.params.id);
        let checkIfExists = await CommentModel.find({videoID: req.params.id});
        if(checkIfExists){
            return res.status(201).json({checkIfExists});
        }else{
           
            return res.status(200).json({message : 'no comments to show'});
        }    
        console.log('send comments data ends')
    } catch (error) {
        console.log(error);
    }  
}