import { Router } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@mobules/users/services/AuthenticateUserService'

const sessionsRoute = Router()

sessionsRoute.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUser = container.resolve(AuthenticateUserService)

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  })

  delete user.password

  return response.json({ user, token })
})

export default sessionsRoute
