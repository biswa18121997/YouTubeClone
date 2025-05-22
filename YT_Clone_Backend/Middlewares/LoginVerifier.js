import { UserModel } from "../SchemaModels/UserModel.js";
import bcrypt from 'bcrypt'

export default async function LoginVerifier(req, res, next){
    try {   
        let { email, password} = req.body;
        let existance = await UserModel.findOne({email})
        if(!existance)
            return res.status(200).json({
                message : "No Such User Exist With this Email ID..!"
            })
        let passwwordVeification = bcrypt.compareSync(password, existance.passwordHashed);
        if(!passwwordVeification)
            return res.status(403).json({
                message : "Password Entered Incorrectly..!"
            })
        next();
        return;
    } catch (e) {
        console.log( "Something went wrong ..please Login / Register agian",e);
        res.status(402).json({
            message: 'Something went wrong ..please Login / Login agian'
        })
    }
}