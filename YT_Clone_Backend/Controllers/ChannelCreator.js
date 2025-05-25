import { ChannelModel } from "../SchemaModels/ChannelModel.js";


export async function ChannelCreator(req,res){
    try {       
        let {chBanner, chDescription, chTags, chName, user} = req.body;
        await ChannelModel.insertOne({ OwnerID:user.email, channelBanner: chBanner, channelDescription: chDescription, channelName: chName, tags:chTags});
        console.log('success')
        return res.status(201).json({success : true});
    } catch (error) {
        console.log(error)
        return res.status(400).json({success : false});
    }
   

}