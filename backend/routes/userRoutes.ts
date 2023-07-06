import express from 'express'
import {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  updateUserValidation,
} from '../controllers/userController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/', getUsers)
router.route('/:userId').put(protect, updateUserValidation)

export default router
