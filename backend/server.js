import express from 'express';
import {config} from 'dotenv'
import colors from 'colors'
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary'

import Auth from './routes/authRouter.js'
import Community from './routes/communityRouter.js'
import Post from './routes/postRouter.js'
import Profile from './routes/profileRouter.js'

config({path:'./.env'})
const app = express();
const corsOptions = {
    origin: 'http://192.168.151.38:8081',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
cloudinary.config({
    cloud_name: 'dzhbqwghe',
    api_key: '978513459175788',
    api_secret: 'cjNR0oqXGZjdx0C-rQmd-0mozaU'
  });


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));





app.use('/',Auth)
app.use('/',Community)
app.use('/',Post)
app.use('/',Profile)




mongoose.connect(process.env.DB).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server is running on port '+colors.cyan(`http://localhost:${process.env.PORT}`))
    })
})

