import jwt from 'jsonwebtoken'
import { SECRET_KEY_JWT } from '../Middlewares/Tokenizer.js';
import mongoose from 'mongoose';
import { ChannelModel } from '../SchemaModels/ChannelModel.js';

export async function RespondChannels(req, res){
    let token = req.body.userLoginToken;
    let{email} = jwt.verify(token, SECRET_KEY_JWT);
    console.log(email);
    let channels = await ChannelModel.find({OwnerID: email});
    if(channels){
        return res.status(200).json(channels);
    }
    return res.status(401).json({message : 'No Channels Found'});

}