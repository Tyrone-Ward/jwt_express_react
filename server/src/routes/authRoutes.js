import { Router } from 'express'
import { verifyToken, register, login, listUsers, logout, getProtectedData, tokenRefresh } from '../controllers/authController.js'
import { authCheck, isAuthenticated } from '../middlewares/auth.middleware.js'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/verifyToken', verifyToken)
authRouter.post('/login', login)
authRouter.get('/listAllUsers', authCheck, listUsers)
authRouter.post('/logout', logout)
authRouter.get('/protected', isAuthenticated, getProtectedData)
authRouter.post('/refresh', tokenRefresh)

export default authRouter
