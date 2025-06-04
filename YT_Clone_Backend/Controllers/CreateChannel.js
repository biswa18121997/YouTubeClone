import { ChannelModel } from "../SchemaModels/ChannelModel.js";
//controller function to create a new channel..
export async function CreateChannel(req,res){
    try {       
        let {chBanner, chDescription, chTags, chName, user} = req.body;
        await ChannelModel.insertOne({ OwnerID: req.body.user.email, channelTitle : chName, tags:chTags.split(','), channelDescription : chDescription, channelBanner:chBanner,subscribersCount:0,videos:[] });
        let channels = await ChannelModel.find({OwnerID: req.body.user.email});
        return res.status(201).json({success : true, channels});
    } catch (error) {
        console.log(error)
        return res.status(400).json({success : false});
    }
   

}