import jwt from 'jsonwebtoken'
import { createUser } from '../services/user.service.js'
import { AppError } from '../utils/AppError.js'
import logger from '../utils/logger.js'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model.js'

const JWT_SECRET = process.env.JWT_SECRET

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
// TODO: Add user validation
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
    // console.log(user.hashedPass)
    const isMatch = await bcrypt.compare(password, user.hashedPass)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Generate JWT Token
    const token = jwt.sign({ username: user.username, role: user.role, id: user.id }, JWT_SECRET, { expiresIn: '24h' })

    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
export const getUserData = async () => {
  // Take user id locate in database and return username, email, bio, etc
}
export const listUsers = async (req, res) => {
  // TODO: add authentication middleware
  // res.status(200).send('hello')
  try {
    const users = await User.findAll()
    const u = []
    users.forEach((user) => {
      u.push({ id: user.dataValues.id, username: user.dataValues.username, email: user.dataValues.email, role: user.dataValues.role })
    })
    res.status(200).send(u)
  } catch (error) {
    console.log(error)
  }
}
