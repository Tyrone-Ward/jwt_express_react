import { Router } from 'express'
import { verifyToken, register } from '../controllers/authController.js'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/verifyToken', verifyToken)

export default authRouter
