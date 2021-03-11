import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateProfileService from '@mobules/users/services/UpdateProfileService'
import ShowProfileService from '@mobules/users/services/ShowProfileService'

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const showProfile = container.resolve(ShowProfileService)

    const user = await showProfile.execute({ user_id })

    delete user.password

    return response.json(user)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, email, oldPassword, password, confirmationPassword } = request.body

    const updateProfile = container.resolve(UpdateProfileService)

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      oldPassword,
      password,
      confirmationPassword,
    })

    delete user.password

    return response.status(200).json(user)
  }
}