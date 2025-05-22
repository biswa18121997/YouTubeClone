import { UserModel } from '../SchemaModels/UserModel.js';
import { SECRET_KEY_JWT } from './Tokenizer.js';
import jwt from 'jsonwebtoken'

export default async function TokenVerifier(req, res, next){
    try {   
        let {email} = req.body;
        let userDetails = await UserModel.findOne({email});
        console.log(SECRET_KEY_JWT);
        let tokenData = jwt.verify(req.token,SECRET_KEY_JWT );
        console.log(req.token,'---->>',tokenData);

        if(!tokenData)
            return res.status(401).json({
                message : 'Token Expired..Please login again..!'
            })
            else {
                if(tokenData.name == userDetails.name && tokenData.email == userDetails.email && tokenData.userID== userDetails.userID){
                    next();
                    return;
                }
                else    
                    return res.status().json({message : `Unauthorized Acces Blocked or The Token Must Have Expired....Please login again to continue..`});
            }
            
    } catch (e) {
        console.log( "Something went wrong ..please Login / Register agian",e);
        return res.status(402).json({
            message: 'Something went wrong ..please Login / Login agian'
        })
    }
}