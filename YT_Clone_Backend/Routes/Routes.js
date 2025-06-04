import RegisterUser from "../Controllers/RegisterUser.js";
import RegisterVerifier from "../Middlewares/RegisterVerifier.js";
import LoginUser from "../Controllers/LoginUser.js";
import LoginVerifier from '../Middlewares/LoginVerifier.js'
import Tokenizer from "../Middlewares/Tokenizer.js";
import TokenVerifier from "../Middlewares/TokenVerifier.js";
import  LocalTokenValidator  from "../Middlewares/LocalTokenValidator.js";
import { SendCommentsData } from "../Controllers/SendCommentsData.js";
import {GetChannels} from '../Controllers/GetChannels.js'
import {CreateChannel} from '../Controllers/CreateChannel.js';
import {EditChannel} from '../Controllers/EditChannel.js'
import { GetDownloads } from "../Controllers/GetDownloads.js";
import { GetProfileData } from "../Controllers/GetProfileData.js";
import { SendDataToDb } from "../Controllers/SendDataToDb.js";
import { VideoPageActions } from "../Controllers/VideoPageActions.js";
import { SendChannelData} from '../Controllers/SendChannelData.js';
import { EditDeleteComment } from "../Controllers/EditDeleteComment.js";
import {SendVideoSearch} from '../Controllers/SendVideoSearch.js'


export default function Routes(app){
  //login routes and registration routes....
   app.post('/register', RegisterVerifier, RegisterUser)
   app.post('/login', LoginVerifier, Tokenizer, TokenVerifier, LoginUser);
  //video player page routes..
   app.post('/video/:id', LocalTokenValidator, VideoPageActions);
   app.put('/video/:id', LocalTokenValidator, SendDataToDb);
   app.get('/video/:id',LocalTokenValidator,SendCommentsData)
   app.patch('/video/:id',LocalTokenValidator,EditDeleteComment)
  //channels and profile page routes..
   app.post('/channels/:id',LocalTokenValidator,SendChannelData);
   app.post('/profile',LocalTokenValidator, GetProfileData);
  //my channel routes..
   app.post('/channel', LocalTokenValidator,GetChannels)
   app.put('/channel', LocalTokenValidator, CreateChannel)
   app.patch('/channel', LocalTokenValidator, EditChannel)
  //downloads routes..
   app.post('/downloads', LocalTokenValidator, GetDownloads)
  //..video page Routes..
  app.post('/videos/:id', LocalTokenValidator, SendVideoSearch);

}