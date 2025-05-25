import { SECRET_KEY_JWT } from "../Middlewares/Tokenizer.js";
import jwt from 'jsonwebtoken'



export default function LocalTokenValidator(req, res, next){
    let token = req.body.userLoginToken;
    let tokenReal=jwt.verify(req.body.userLoginToken, SECRET_KEY_JWT);
   
     let {userID,name,email } = tokenReal;
    if(tokenReal){
        console.log('success from localvalidator',req.body)
         console.log(req.body.userLoginToken)
        next();
        return;

    }

    return res.status(403).json({success : false});
}