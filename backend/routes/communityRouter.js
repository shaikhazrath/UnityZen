import express from 'express'
import { CreateCommunity, GetCommunityPosts, GetUserCommunity } from '../controllers/communityController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
import multer from 'multer';
const upload = multer({ dest: 'uploads/communityImage' })

router.get('/getusercommunity',authMiddleware, GetUserCommunity)
router.get('/getcommunityposts/:id',authMiddleware, GetCommunityPosts)
router.post('/createcommunity',upload.single('communityImage'),authMiddleware,CreateCommunity)

export default router