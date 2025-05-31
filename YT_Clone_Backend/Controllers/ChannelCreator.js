import { ChannelModel } from "../SchemaModels/ChannelModel.js";

import mongoose from "mongoose";

export async function ChannelCreator(req,res){
    try {       
        let {chBanner, chDescription, chTags, chName, user} = req.body;
        console.log(chBanner,'hii,', chDescription, chTags, chName, user,req.body.user.email)
        await ChannelModel.insertOne({ OwnerID: req.body.user.email, channelName : chName, tags:chTags.split(','), channelDescription : chDescription, channelBanner:chBanner,subscribersCount:0,videos:[] });
        console.log('success')
        return res.status(201).json({success : true});
    } catch (error) {
        console.log(error)
        return res.status(400).json({success : false});
    }
   

}