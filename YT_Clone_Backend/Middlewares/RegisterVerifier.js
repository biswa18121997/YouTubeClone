import { UserModel } from "../SchemaModels/UserModel.js";


export default async function RegisterVerifier(req, res, next){
    try {   
        let {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "enter name , Email and password..!"})
        }
        let userExistance = await UserModel.findOne({"email" : email});
        if(userExistance){
            return res.status(403).json({
                message : "User Already Exist with this email please try registering with a different Email..!"})
        }
        next();
        return;
    } catch (e) {
        console.log( "Something went wrong ..please try or Login agian");
        return res.status(402).json({
            message: 'Something went wrong ..please try or Login agian'
        })
    }
}