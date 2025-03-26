import os from 'node:os'
import jsonwebtoken from 'jsonwebtoken'
import { AppError } from '../utils/AppError.js'

class RootController {
  root = (req, res) => {
    res.send('hello')
  }
  error = (req, res) => {
    throw new AppError('INVALID_SUBSCRIPTION', 'Subscription not found', 400)
  }
  apiHealth = (req, res) => {
    res.status(200)
    res.json({
      database: 'green',
      health: 'green',
      process_uptime: `${Math.floor(process.uptime())} seconds`,
      system_uptime: `${Math.floor(os.uptime())} seconds`
    })
  }
}

export { RootController }
