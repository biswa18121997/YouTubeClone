import { VideoModel } from "../SchemaModels/VideoModel.js";
import { ChannelModel } from "../SchemaModels/ChannelModel.js";

//controller function that sends channel data..
export async function SendChannelData(req, res) {

try {
    let {channelId , token} = req.body;
    let channel = await ChannelModel.find({channelId});
    let videos = await VideoModel.find({channelId});
    res.status(201).json({channel,videos})

} catch (error) {
    console.log(error)
}



}