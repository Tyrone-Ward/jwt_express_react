import { Router } from 'express'
import { verifyToken, register, login } from '../controllers/authController.js'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/verifyToken', verifyToken)
authRouter.post('/login', login)

export default authRouter
