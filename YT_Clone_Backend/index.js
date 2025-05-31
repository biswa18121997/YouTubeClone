import mongoose from "mongoose";
import express from 'express';
import Routes from "./Routes/Routes.js";
import Connection from './utils/ConnectDB.js'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

//app.use(tokenVerifier);
Routes(app);

Connection();

const PORT = 8086;
app.listen(PORT,()=>{
    console.log('server is live at port :', PORT);
})


