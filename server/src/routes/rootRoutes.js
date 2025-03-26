import { Router } from 'express'
import { RootController } from '../controllers/index.js'

const rootRouter = Router()
const rc = new RootController()

rootRouter.get('/', rc.root)
rootRouter.get('/error', rc.error)
rootRouter.get('/health', rc.apiHealth)

export default rootRouter
