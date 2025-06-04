import { ProfileModel } from "../SchemaModels/ProfileModel.js";
//controller function to get profile data for profile page..
export async function GetProfileData(req,res) {
    try {
        let {user} = req.body;
        let profileData = await ProfileModel.findOne({email : user.email});
        res.status(200).json({profileData});
        

    } catch (error) {
        console.log(error)
    }
    
}