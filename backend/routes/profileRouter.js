import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { Profile, updateProfile } from '../controllers/profileController.js';
import multer from 'multer';


const upload = multer({ dest: 'uploads/profileImage' })
const router = express.Router();

router.get('/profile',authMiddleware,Profile)
router.post('/updateprofile', upload.single('profileImage'),authMiddleware,updateProfile)

export default router