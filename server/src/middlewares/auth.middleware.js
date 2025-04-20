import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const authCheck = (req, res, next) => {
  const authHeader = req.headers['authorization']

  // Format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Token missing' }).end()
  }

  next()
}

export default authCheck
