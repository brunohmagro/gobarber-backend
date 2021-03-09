import { Router } from 'express'

import ProvidersController from '@mobules/appointments/infra/http/controllers/ProvidersController'
import ensureAuthenticated from '@mobules/users/infra/http/middlewares/ensureAuthenticated'

const providersRouter = Router()
providersRouter.use(ensureAuthenticated)

const providersController = new ProvidersController()

providersRouter.post('/', providersController.index)

export default providersRouter
