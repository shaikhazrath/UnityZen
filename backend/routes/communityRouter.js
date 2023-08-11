import express from 'express'
import { CreateCommunity, GetCommunityPosts, GetUserCommunity } from '../controllers/communityController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/getusercommunity',authMiddleware, GetUserCommunity)
router.get('/getcommunityposts/:id',authMiddleware, GetCommunityPosts)
router.post('/createcommunity',authMiddleware,CreateCommunity)

export default router