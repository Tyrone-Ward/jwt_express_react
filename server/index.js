#! /usr/bin/env node

import { expressServer, app, PORT } from './src/config/index.js'
import morganMiddleware from './src/middlewares/httpLpgger.js'
import logger from './src/utils/logger.js'
import { errorHandler } from './src/middlewares/errorHandler.js'

// Routes
import rootRouter from './src/routes/rootRoutes.js'
import authRouter from './src/routes/authRoutes.js'

app.use(morganMiddleware)

app.use('/', rootRouter)
app.use('/auth', authRouter)
// app.use('/v2/api', apiRouter)

app.use(errorHandler)

expressServer.listen(PORT, () => {
  logger.info(`Listening on http://localhost:${PORT}`)
})
