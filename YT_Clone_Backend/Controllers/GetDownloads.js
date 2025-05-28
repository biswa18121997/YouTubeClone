import { ProfileModel } from "../SchemaModels/ProfileModel.js";

export async function GetDownloads(req, res) {
    try {
        let {user} = req.body;
        console.log(user)
        let videoDownloaded = await ProfileModel.find({OwnerID:user.email }).downloaded ;
        
        console.log(videoDownloaded)
        if(!videoDownloaded || videoDownloaded.length == 0){
            return res.status(400).json({message: 'no videos to show'});
        }
        console.log('below')
        return res.status(200).json(videoDownloaded);
    } catch (error) {
        
    }
    
}