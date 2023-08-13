import Community from "../models/communityModel.js"
import Post from "../models/postModel.js"
import cloudinary from 'cloudinary'; 
import fs from 'fs/promises'; 

export const CreateCommunity = async(req,res)=>{
    try {
        const user = req.user
        const {name,description} = req.body
        if(!name){
        res.status(401).json({message:"provide name"})
        }

        let communityImage ={}
        if(req.file){
            const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "unityzen/communityImage",
                width: 150,
                crop: "scale",
              });
              communityImage = {
                public_id: myCloud.public_id,
                url: myCloud.url
            };
        }
   
        const Newcommunity = new Community({
            name,
            description,
            user,
            communityImage
        })
        await Newcommunity.save()
        res.status(200).json({
            message:'new community has been created',
            Newcommunity
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const GetUserCommunity = async(req,res)=>{
    try {
        const user = req.user
        const community = await Community.find({user:user})
        res.status(200).json(community) 
    } catch (error) {
        res.status(500).json({error:error})
    }
}

export const GetCommunityPosts = async(req,res)=>{
    try {
        const id = req.params.id
        const community = await Post.find({community:id})
        res.status(200).json(community) 
    } catch (error) {
        res.status(500).json({error:error})
    }
}