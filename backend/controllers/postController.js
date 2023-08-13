import Post from "../models/postModel.js"



export const UserPosts = async(req,res)=>{
    try {
        const user = req.user
        const posts = await Post.find({author:user , postInPersonalFeed: true })
        res.status(200).json({
            posts
        })
    } catch (error) {
        res.status(500).json(error)
    }
}



export const createUserPost = async(req,res)=>{
    try {
       const  user = req.user
        const {title,content,postInPersonalFeed} = req.body
        const newPost = new Post({
            title,
            content,
            author: user,
            postInPersonalFeed
        })
        newPost.save()
        res.status(200).json({
            message:'post created successfully',
            newPost
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


export const createCommunityPost = async(req,res)=>{
    try {
        const id = req.params.id
       const  user = req.user
        const {title,content} = req.body
        const newPost = new Post({
            title,
            content,
            author: user,
            community:id
        })
        newPost.save()
        res.status(200).json({
            message:'post created successfully',
            newPost
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
