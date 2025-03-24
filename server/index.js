require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  const token = jwt.sign({ foo: 'bar', email: 'gameplace123' }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.cookie('token', token)
  res.send('Hello World!')
})
app.post('/verifyToken', (req, res) => {
  const token = req.body.token
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    console.log('token verified')
    return res.sendStatus(200)
  } catch {
    console.log('bad token')
    return res.sendStatus(401)
  }
})
app.get('/slow', (req, res) => {
  setTimeout(() => {
    res.sendStatus(200)
  }, 2000)
})
app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  res.cookie('token', token)
  res.send(decoded)
})
app.post('/register', (req, res) => {
  console.log(req.body)
  const { password, email, username } = req.body
  console.log('email:', email, 'password:', password, 'username:', username)
  res.sendStatus(200)
})
app.post('/login', (req, res) => {
  console.log(req.headers)
  // console.log('email:', req.body.email, 'password:', req.body.password)
  console.log(req.body.email === 'gameplace123' && req.body.password === 'password')
  if (req.body.email === 'gameplace123@gmail.com' && req.body.password === 'password') {
    const token = jwt.sign({ foo: 'bar', email: req.body.email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' })
    // res.append('Authorization', 'Bearer ' + token)
    console.log(token)
    res.json({ token })
  } else {
    res.sendStatus(401)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
