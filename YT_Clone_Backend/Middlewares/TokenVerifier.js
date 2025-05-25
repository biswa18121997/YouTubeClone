import { UserModel } from '../SchemaModels/UserModel.js';
import { SECRET_KEY_JWT } from './Tokenizer.js';
import jwt from 'jsonwebtoken'


export default async function TokenVerifier(req, res, next){
    try {   
        let userLoginToken = req.token;
        let verifcation = jwt.verify(userLoginToken, SECRET_KEY_JWT);
        if(!verifcation){
            res.status(403).json({message: "TOKEN EXPIRED PLEASE LOGIN AGAIN.."})
        }
        else{
            console.log(req.token, req.email, req.name, req.userID);
        next();
        return;
        }
        
       
    } catch (e) {
        console.log( "Something went wrong ..please Login / Register agian",e);
        return res.status(402).json({
            message: 'Something went wrong ..please Login / Login agian . Your Token Must Be Invalid'
        })
    }
}