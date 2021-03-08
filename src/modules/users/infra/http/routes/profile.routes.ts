import { Router } from 'express'

import ProfileController from '@mobules/users/infra/http/controllers/ProfileController'
import ensureAuthenticated from '@mobules/users/infra/http/middlewares/ensureAuthenticated'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)
profileRouter.put('/update', profileController.update)

export default profileRouter
