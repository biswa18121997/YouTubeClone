import { ProfileModel } from "../SchemaModels/ProfileModel.js";
//controller function sending users history data..
export async function SendHistoryVideo(req, res) {
    try {       
        let {token, user} = req.body;
        let historyVideo = await ProfileModel.findOne({email : user.email});
        if(!historyVideo)
            return res.status(202).json({message : 'no profiles found'});
        return res.status(201).json(historyVideo);
    } catch (error) {
        console.log(error)
    }
    
}