import { SECRET_KEY_JWT } from "../Middlewares/Tokenizer.js";
import jwt from 'jsonwebtoken'



export default function LocalTokenValidator(req, res, next){
    let token = req.body.userLoginToken;
    let tokenReal=jwt.verify(req.body.token, SECRET_KEY_JWT);
    if(tokenReal){
        console.log('hi from local validator..')
        next();
        return;

    }

    return res.status(403).json({success : false});
}