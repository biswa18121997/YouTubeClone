import RegisterUser from "../Controllers/RegisterUser.js";
import RegisterVerifier from "../Middlewares/RegisterVerifier.js";
import LoginUser from "../Controllers/LoginUser.js";
import LoginVerifier from '../Middlewares/LoginVerifier.js'
import Tokenizer from "../Middlewares/Tokenizer.js";
import TokenVerifier from "../Middlewares/TokenVerifier.js";


export default function Routes(app){

   app.post('/register', RegisterVerifier, RegisterUser)
   app.post('/login', LoginVerifier, Tokenizer, TokenVerifier, LoginUser);

}