import jwt from 'jsonwebtoken'
import { SECRET_KEY_JWT } from '../Middlewares/Tokenizer.js';
import { ChannelModel } from '../SchemaModels/ChannelModel.js';
//controller function to responds to channels data in db..
export async function RespondChannels(req, res){
    let token = req.body.userLoginToken;
    let{email} = jwt.verify(token, SECRET_KEY_JWT);
    let channels = await ChannelModel.find({channelId: email});
    if(channels){
        return res.status(200).json(channels);
    }
    return res.status(401).json({message : 'No Channels Found'});

}