import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserServive from '@mobules/users/services/CreateUserService'

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserServive)

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    delete user.password

    return response.status(200).json(user)
  }
}
