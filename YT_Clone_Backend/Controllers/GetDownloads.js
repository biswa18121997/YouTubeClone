import { ProfileModel } from "../SchemaModels/ProfileModel.js";

export async function GetDownloads(req, res) {
    try {
        let {user, profile } = req.body;
        console.log(user)
        let searchProfile = await ProfileModel.find({OwnerID:user.email }) ;
        let getDownloaded = searchProfile.downloaded;
        console.log(searchProfile)
        if(!getDownloaded || getDownloaded.length == 0){
            return res.status(400).json({message: 'no videos to show'});
        }
        console.log('below');
        return res.status(200).json(getDownloaded);
    } catch (error) {
        
    }
    
}