import { ProfileModel } from "../SchemaModels/ProfileModel.js";

export async function GetProfileData(req,res) {
    try {
        let {user} = req.body;
        let profileData = await ProfileModel.findOne({email : user.email});
        res.status(200).json({profileData});
        

    } catch (error) {
        console.log(error)
    }
    
}