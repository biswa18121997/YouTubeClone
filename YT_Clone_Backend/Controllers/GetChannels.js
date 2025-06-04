import { ChannelModel } from "../SchemaModels/ChannelModel.js";
//controller function to get channels data..
export async function GetChannels(req, res){

    let {user} = req.body;
    let channels = await ChannelModel.find({OwnerID:user.email})
    if(!channels){
        return res.status(400).json({message: 'no channels to show'});
    }
    return res.status(200).json(channels);
}