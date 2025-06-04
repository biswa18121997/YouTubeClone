import { VideoModel } from "../SchemaModels/VideoModel.js";
import { ProfileModel } from "../SchemaModels/ProfileModel.js";
//controller function sending video search data and filters data on video page.. data..

export async function SendVideoSearch(req, res) {
    try {
        console.log(req?.body)
        let searchResult = await VideoModel.find({ videoTitle: { $regex: req?.body?.sendToServer?.search, $options: 'i' }});
        let recentlyAdded = await VideoModel.find().sort({ _id: -1 }).limit(15);        
        let profile = await ProfileModel.findOne({email : req?.body?.sendToServer?.user?.email});
        let action = await VideoModel.find({ videoDescription: { $regex: 'Action', $options: 'i' }});
        let Technology = await VideoModel.find({ videoDescription: { $regex: 'Technology', $options: 'i' }})
        return res.status(200).json({recentlyAdded, searchResult,  profile, action, Technology});      
    } catch (error) {
        console.log(error)
    }
    
}














