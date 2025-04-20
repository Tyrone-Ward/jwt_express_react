import jwt from 'jsonwebtoken'
import { createUser } from '../services/user.service.js'
import { AppError } from '../utils/AppError.js'
import logger from '../utils/logger.js'
import bcrypt from 'bcryptjs'
import { User, RefreshToken } from '../models/user.model.js'

const JWT_SECRET = process.env.JWT_SECRET
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const ACCESS_TOKEN_EXPIRES_IN = '15m'
const REFRESH_TOKEN_EXPIRES_IN = '7d'

export const verifyToken = (req, res) => {
  const { token } = req.body
  // DONE: Send status 401 if no token
  if (!token) return res.status(401).json({ message: 'No token provided' })
  try {
    // Verify the token using the JWT secret key
    jwt.verify(token, JWT_SECRET)

    // If verification is successful, log a message and send a 200 (OK) response
    logger.info('Token verified')
    return res.sendStatus(200)
  } catch (error) {
    // Unauthorized
    console.log(error.message)
    if (error.message === 'jwt expired') {
      return res.status(401).json({ message: 'Token Expired' })
    }
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
// 4 TODO: Add user validation
export const register = async (req, res) => {
  try {
    const role = 'admin'
    const { password, email, username } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    await createUser(email, username, hashedPassword)
    res.sendStatus(200)
  } catch (error) {
    logger.error(error.message)
    res.status(error.statusCode)
    res.send(error.message)
  }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Find user by email
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.hashedPass)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Generate JWT Tokens
    logger.info('The table for the RefreshToken model was just (re)created!')
    const accessToken = jwt.sign({ username: user.username, role: user.role, id: user.id, email: user.email }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN })
    const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN })
    const tokenHash = await bcrypt.hash(refreshToken, 10)
    // Sore the refresh token
    await RefreshToken.sync()
    await RefreshToken.create({
      tokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.json({ token: accessToken })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
export const getUserData = async () => {
  // Take user id locate in database and return username, email, bio, etc
}
export const listUsers = async (req, res) => {
  // DONE: add authentication middleware
  try {
    const users = await User.findAll()
    const u = []
    users.forEach((user) => {
      u.push({ id: user.dataValues.id, username: user.dataValues.username, email: user.dataValues.email, role: user.dataValues.role })
    })
    res.status(200).send(u)
  } catch (error) {
    return res.status(403).json({ message: 'Token is invalid or expired' })
  }
}
// 0 TODO: create controller(s) for logout
export const logout = async (req, res) => {
  try {
    const tokens = await RefreshToken.findAll()
    const refreshToken = req.cookies?.refreshToken
    if (!refreshToken) {
      return res.status(400).json({ message: 'No refresh token provided.' })
    }
    // Delete the refresh token from the DB
    for (const t of tokens) {
      const match = await bcrypt.compare(refreshToken, t.tokenHash)
      if (match) {
        logger.info('found token')
        await t.destroy()
        break
      }
    }
    // Clear the cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'Lax'
    })
    return res.status(200).json({ message: 'Logged out successfully.' })
  } catch (error) {
    logger.error('Logout error:', error)
    return res.status(500).json({ message: 'Server error during logout.' })
  }
}
