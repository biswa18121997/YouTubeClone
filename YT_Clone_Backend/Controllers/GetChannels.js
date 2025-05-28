import { ChannelModel } from "../SchemaModels/ChannelModel.js";

export async function GetChannels(req, res){

    let {user} = req.body;
    console.log(user)
    let channels = await ChannelModel.find({OwnerID:user.email})
    console.log(channels)
    if(!channels){
        console.log('did i log')
        return res.status(400).json({message: 'no channels to show'});
    }
    console.log('below channels')
    return res.status(200).json(channels);
}