#! /usr/bin/env node

import { expressServer, app, PORT } from './src/config/index.js'
import morganMiddleware from './src/middlewares/httpLpgger.js'
import logger from './src/utils/logger.js'
import { errorHandler } from './src/middlewares/errorHandler.js'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  logging: (msg) => logger.info(msg),
  dialect: 'sqlite',
  storage: './database/database.db'
})

// Routes
import rootRouter from './src/routes/rootRoutes.js'
import authRouter from './src/routes/authRoutes.js'

app.use(morganMiddleware)

app.use('/', rootRouter)
app.use('/auth', authRouter)
// app.use('/v2/api', apiRouter)

app.use(errorHandler)

// Gracefully shutdown
let SHUTDOWN = false

process.on('SIGINT', async () => {
  if (!SHUTDOWN) {
    logger.info('Closing connections')
    expressServer.close()
    await sequelize.close()
  }
})

expressServer.listen(PORT, () => {
  logger.info(`Listening on http://localhost:${PORT}`)
})
