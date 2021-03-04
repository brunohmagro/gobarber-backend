import path from 'path'
import fs from 'fs'
import { injectable, inject } from 'tsyringe'

import User from '@mobules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import IUpdateAvatarUser from '@mobules/users/dtos/IUpdateAvatarUser'

import uploadConfig from '@config/upload'

@injectable()
class UpdateAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IUpdateAvatarUser): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 404)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.diretory, user.avatar)
      const userAvatarFileExistis = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExistis) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName

    await this.userRepository.save(user)

    return user
  }
}

export default UpdateAvatarUserService
