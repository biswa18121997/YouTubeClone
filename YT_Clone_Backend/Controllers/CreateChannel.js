import { ChannelModel } from "../SchemaModels/ChannelModel.js";



export async function CreateChannel(req,res){
    try {       
        let {chBanner, chDescription, chTags, chName, user} = req.body;
        console.log(chBanner,'hii,', chDescription, chTags, chName, user,req.body.user.email)
        await ChannelModel.insertOne({ OwnerID: req.body.user.email, channelTitle : chName, tags:chTags.split(','), channelDescription : chDescription, channelBanner:chBanner,subscribersCount:0,videos:[] });
        console.log('success');
        let channels = await ChannelModel.find({OwnerID: req.body.email});
        return res.status(201).json({success : true, channels});
    } catch (error) {
        console.log(error)
        return res.status(400).json({success : false});
    }
   

}