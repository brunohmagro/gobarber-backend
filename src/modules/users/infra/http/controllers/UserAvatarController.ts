import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import UpdateAvatarUserService from '@mobules/users/services/UpdateAvatarUserService'

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateAvatarUserService)
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    })

    return response.status(200).json(classToClass(user))
  }
}
