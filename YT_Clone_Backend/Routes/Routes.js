import RegisterUser from "../Controllers/RegisterUser.js";
import RegisterVerifier from "../Middlewares/RegisterVerifier.js";
import LoginUser from "../Controllers/LoginUser.js";
import LoginVerifier from '../Middlewares/LoginVerifier.js'
import Tokenizer from "../Middlewares/Tokenizer.js";
import TokenVerifier from "../Middlewares/TokenVerifier.js";
import VideoInfoVerifier from '../Middlewares/VideoInfoVerifier.js'
import  LocalTokenValidator  from "../Middlewares/LocalTokenValidator.js";
import { ChannelCreator } from "../Controllers/ChannelCreator.js";
import { CommentUpdater } from "../Controllers/CommentUpdater.js";
import { SendVideoData } from "../Controllers/SendVideoData.js";
import {GetChannels} from '../Controllers/GetChannels.js'
import {CreateChannel} from '../Controllers/CreateChannel.js';
import {EditChannel} from '../Controllers/EditChannel.js'
import { GetDownloads } from "../Controllers/GetDownloads.js";
import { GetProfileData } from "../Controllers/GetProfileData.js";


export default function Routes(app){

   app.post('/register', RegisterVerifier, RegisterUser)
   app.post('/login', LoginVerifier, Tokenizer, TokenVerifier, LoginUser);
   
   app.post('/video/:id', LocalTokenValidator, VideoInfoVerifier);
   app.put('/video/:id', LocalTokenValidator, CommentUpdater);
   app.get('video/:id',LocalTokenValidator,SendVideoData)

   app.post('/profile',LocalTokenValidator, GetProfileData);
  
   app.post('/channel', LocalTokenValidator,GetChannels)
   app.put('/channel', LocalTokenValidator, CreateChannel)
   app.post('/downloads', LocalTokenValidator, GetDownloads)
  //  app.put('/channel',LocalTokenValidator,EditChannel);
  // app.post('/channel/:id')

}