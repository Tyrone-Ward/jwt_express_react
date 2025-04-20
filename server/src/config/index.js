import 'dotenv/config'
import { readFileSync } from 'node:fs'
import express from 'express'
import http from 'node:http'
import https from 'https'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// const keyDir = `/etc/letsencrypt/live/${process.env.siteURL}`
// const dbName = process.env.Database_Name

// if (process.env.NODE_ENV === 'production') {
//   const credentials = {
//     key: readFileSync(`${keyDir}/privkey.pem`, 'utf8'),
//     cert: readFileSync(`${keyDir}/cert.pem`, 'utf8'),
//     ca: readFileSync(`${keyDir}/tyroneward.dev/chain.pem`, 'utf8')
//   }
// }

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())
app.use(cookieParser())

const expressServer = http.createServer(app)
const PORT = process.env.PORT || 3000

export { app, expressServer, PORT }
