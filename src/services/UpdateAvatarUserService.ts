import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import User from '../models/User'

import uploadConfig from '../config/upload'

interface Request {
  user_id: string
  avatarFileName: string
}

class UpdateAvatarUserService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne(user_id)

    if (!user) {
      throw new Error('Only authenticated users can change avvatar')
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.diretory, user.avatar)
      const userAvatarFileExistis = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExistis) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName

    await userRepository.save(user)

    return user
  }
}

export default UpdateAvatarUserService
