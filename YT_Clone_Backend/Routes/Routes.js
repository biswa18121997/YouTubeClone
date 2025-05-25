import RegisterUser from "../Controllers/RegisterUser.js";
import RegisterVerifier from "../Middlewares/RegisterVerifier.js";
import LoginUser from "../Controllers/LoginUser.js";
import LoginVerifier from '../Middlewares/LoginVerifier.js'
import Tokenizer from "../Middlewares/Tokenizer.js";
import TokenVerifier from "../Middlewares/TokenVerifier.js";
import VideoInfoVerifier from '../Middlewares/VideoInfoVerifier.js'
import  LocalTokenValidator  from "../Middlewares/LocalTokenValidator.js";
import { ChannelCreator } from "../Controllers/ChannelCreator.js";

export default function Routes(app){

   app.post('/register', RegisterVerifier, RegisterUser)
   app.post('/login', LoginVerifier, Tokenizer, TokenVerifier, LoginUser);
   app.get('/videos', TokenVerifier,  )
   app.post('/video/:id', LocalTokenValidator, VideoInfoVerifier);
   app.post('/channel', LocalTokenValidator, )
   app.put('/channel',LocalTokenValidator,ChannelCreator);
  // app.post('/channel/:id')

}