import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { UserModel } from "../SchemaModels/UserModel.js";
import {ProfileModel} from '../SchemaModels/ProfileModel.js'
import { SECRET_KEY_JWT } from "../Middlewares/Tokenizer.js";
//login user controller that sends the token to clent to be saved to local storage..after jwt verification

export default async function LoginUser(req, res) {
    try {
        let findProfile = await ProfileModel.findOne({email:req.email});
        let findUser = await UserModel.findOne({email: req.email});
        if(jwt.verify(req.token, SECRET_KEY_JWT)){
            let {userID,name,email } = jwt.verify(req.token, SECRET_KEY_JWT);
        }
        else{
            return res.status(201).json({
                success : false,
                message : 'token Expired ..Please Login Again...!'
             });
        }
        return res.status(201).json({
                success : true,
                user : findUser || null,
                token : req.token
             });       
    } catch (error) {
        res.status(400).json({
            message : 'Somthing went wrong ..Please try again..'
        })
    }
}

