import { Router } from 'express'

import SessionsController from '@mobules/users/infra/http/controllers/SessionsController'

const sessionsRoute = Router()
const sessionController = new SessionsController()

sessionsRoute.post('/', sessionController.create)

export default sessionsRoute
