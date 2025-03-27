import jwt from 'jsonwebtoken'
import { createUser } from '../services/user.service.js'

export const verifyToken = (req, res) => {
  const { token } = req.body
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    console.log('token verified')
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(401)
  }
}
export const register = async (req, res) => {
  const { password, email, username } = req.body
  // console.log('email:', email, 'password:', password, 'username:', username)
  try {
    await createUser(email, username, password)
    res.sendStatus(200)
  } catch (error) {
    res.status(500)
    res.json({ serverError: 'user not created' })
  }
}
