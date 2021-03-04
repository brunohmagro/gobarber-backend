import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateAvatarUserService from '@mobules/users/services/UpdateAvatarUserService'

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateAvatarUserService)
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    })

    delete user.password

    return response.status(200).json(user)
  }
}
