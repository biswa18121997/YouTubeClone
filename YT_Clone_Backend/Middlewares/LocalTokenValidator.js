import { SECRET_KEY_JWT } from "../Middlewares/Tokenizer.js";
import jwt from 'jsonwebtoken'



export default function LocalTokenValidator(req, res, next){
//     console.log('local token validator starts..')
//    console.log(req?.headers?.['authorization'])
//    console.log(req?.body,req?.body?.token);
    try {
        if(req?.body?.token){
            // console.log(req.params.id)
            let tokenReal=jwt.verify(req?.body?.token, SECRET_KEY_JWT);
            if(tokenReal){
                // console.log('hi from local validator..')
                next();
                return;
            }
            else
                return res.status(403).json({success : false});
        }
        else if(req?.headers?.authorization){      
            let auth =req?.headers?.['authorization'] && req?.headers?.['authorization']?.split(' ')[1];
            // console.log(auth);
            // console.log(req.params.id);
            let tokenReal=jwt.verify(auth, SECRET_KEY_JWT);
        
            if(tokenReal){
                next();
                return;
            }
            else{
                return res.status(403).json({message : 'invalid token plesae logi again..!'})
            }
        }
        console.log('local token validator ends..')
    } catch (error) {
        console.log(error)
    }
    

    
}