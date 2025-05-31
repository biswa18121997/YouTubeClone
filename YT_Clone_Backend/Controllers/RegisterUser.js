import { UserModel } from "../SchemaModels/UserModel.js";
import bcrypt from 'bcrypt'

export const SALT = 8;


export default async function RegisterUser(req, res){
    try {   
        let { name, email, password } = req.body;
        await UserModel.insertOne({ name, email, passwordHashed : bcrypt.hashSync(password, SALT)})
        return res.status(201).json({message : "User Created Succeesfully..!Please Login to Continue"});
    } catch (e) {
        console.log( "Something went wrong ..please Login / Register agian",e);
        res.status(402).json({
            message: 'Something went wrong ..please Login / Login agian'
        })
    }
}