import { Router } from 'express'
import multer from 'multer'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserServive from '../services/CreateUserService'
import uploadConfig from '../config/upload'

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
  (request, response) => {
    return response.json({ message: 'Deu certo acessar a rota' })
  }
)

export default usersRouter
