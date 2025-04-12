import { Router } from 'express'
import { verifyToken, register, login, listUsers } from '../controllers/authController.js'
import authCheck from '../middlewares/auth.middleware.js'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/verifyToken', verifyToken)
authRouter.post('/login', login)
authRouter.get('/listAllUsers', authCheck, listUsers)

export default authRouter
