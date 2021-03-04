import { Router } from 'express'
import multer from 'multer'
import { container } from 'tsyringe'

import CreateUserServive from '@mobules/users/services/CreateUserService'
import ensureAuthenticated from '@mobules/users/infra/http/middlewares/ensureAuthenticated'
import uploadConfig from '@config/upload'
import UpdateAvatarUserService from '@mobules/users/services/UpdateAvatarUserService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = container.resolve(CreateUserServive)

  const user = await createUser.execute({
    name,
    email,
    password,
  })

  delete user.password

  return response.status(200).json(user)
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = container.resolve(UpdateAvatarUserService)
  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFileName: request.file.filename,
  })

  delete user.password

  return response.status(200).json(user)
})

export default usersRouter
