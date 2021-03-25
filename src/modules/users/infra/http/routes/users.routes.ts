import { Router } from 'express'
import multer from 'multer'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@mobules/users/infra/http/middlewares/ensureAuthenticated'
import uploadConfig from '@config/upload'

import UsersController from '@mobules/users/infra/http/controllers/UsersController'
import UserAvatarController from '@mobules/users/infra/http/controllers/UserAvatarController'

const usersRouter = Router()
const upload = multer(uploadConfig.multer)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      confirm_password: Joi.string().valid(Joi.ref('password')),
    },
  }),
  usersController.create,
)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
)

export default usersRouter
