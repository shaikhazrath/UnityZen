import express from 'express'
import { UserPosts, createCommunityPost, createUserPost } from '../controllers/postController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/createUserPost',authMiddleware, createUserPost)
router.get('/userposts',authMiddleware, UserPosts)
router.post('/createcommunityposts/:id',authMiddleware, createCommunityPost)



export default router