import { Router } from 'express'
import multer from 'multer'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserServive from '../services/CreateUserService'
import uploadConfig from '../config/upload'
import UpdateAvatarUserService from '../services/UpdateAvatarUserService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body

    const createUser = new CreateUserServive()

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    delete user.password

    return response.status(200).json(user)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateAvatarUserService()
      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      })

      delete user.password

      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
)

export default usersRouter
