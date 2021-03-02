import { Router } from 'express'
import multer from 'multer'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserServive from '../services/CreateUserService'
import uploadConfig from '../config/upload'
import UpdateAvatarUserService from '../services/UpdateAvatarUserService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = new CreateUserServive()

  const user = await createUser.execute({
    name,
    email,
    password,
  })

  delete user.password

  return response.status(200).json(user)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateAvatarUserService()
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    })

    delete user.password

    return response.status(200).json(user)
  }
)

export default usersRouter
