import express from 'express'
import { Register, Login, Profile } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/',authMiddleware,Profile)
router.post('/signup',Register)
router.post('/signin',Login)


export default router