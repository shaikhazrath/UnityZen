import express from 'express';
import {config} from 'dotenv'
import colors from 'colors'
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser';

import Auth from './routes/authRouter.js'
import Community from './routes/communityRouter.js'
import Post from './routes/postRouter.js'

config({path:'./.env'})
const app = express();
const corsOptions = {
    origin: 'http://192.168.55.107:8081',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  



app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(corsOptions));




app.use('/',Auth)
app.use('/',Community)
app.use('/',Post)




mongoose.connect(process.env.DB).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server is running on port '+colors.cyan(`http://localhost:${process.env.PORT}`))
    })
})

