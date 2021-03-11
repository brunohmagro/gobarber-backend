import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ProfileController from '@mobules/users/infra/http/controllers/ProfileController'
import ensureAuthenticated from '@mobules/users/infra/http/middlewares/ensureAuthenticated'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)
profileRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      confirmationPassword: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
)

export default profileRouter
