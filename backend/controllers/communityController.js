import Community from "../models/communityModel.js"
import Post from "../models/postModel.js"


export const CreateCommunity = async(req,res)=>{
    try {
        const user = req.user
        const {name,description} = req.body
        console.log(name)
        if(!name){
        res.status(401).json({message:"provide name"})
        }
        const Newcommunity = new Community({
            name,
            description,
            user
        })
        await Newcommunity.save()
        res.status(200).json({
            message:'new community has been created',
            Newcommunity
        })
    } catch (error) {
        res.status(500).json({error:error})
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