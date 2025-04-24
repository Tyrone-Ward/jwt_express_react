import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

// DONE: Add isAdmin and isAuthorized middleware

export const authCheck = (req, res, next) => {
  const authHeader = req.headers['authorization']

  // Format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    res.status(401)
    res.json({ message: 'Token missing' })
    return
  }
  try {
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET)
    if (user.role !== 'admin') throw new Error()
    req.user = user // Add user info to request object
  } catch (error) {
    res.status(401)
    res.json({ message: 'User not admin' })
    return
  }

  next()
}

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    res.status(401)
    res.json({ message: 'Token missing' })
    return
  }
  try {
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET)
    req.user = user // Add user info to request object
  } catch (error) {
    res.status(401)
    res.json({ message: 'User not authorized' })
    return
  }

  next()
}

export const isAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization']

  // Format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    res.status(401)
    res.json({ message: 'Token missing' })
    return
  }
  try {
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET)
    if (user.role !== 'admin') throw new Error()
    req.user = user // Add user info to request object
  } catch (error) {
    res.status(401)
    res.json({ message: 'User not admin' })
    return
  }

  next()
}
