import { Router } from 'express'
import { verifyToken, register, login, listUsers } from '../controllers/authController.js'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/verifyToken', verifyToken)
authRouter.post('/login', login)
authRouter.get('/listAllUsers', listUsers)

export default authRouter
