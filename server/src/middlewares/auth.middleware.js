import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const authCheck = (req, res, next) => {
  const authHeader = req.headers['authorization']

  // Format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token missing' })

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is invalid or expired' })
    if (user.role !== 'admin') res.status(401).json({ message: 'User not admin' })
    req.user = user // Add user info to request object
    next()
  })
}

export default authCheck
