import { injectable, inject } from 'tsyringe'

import User from '@mobules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import IUpdateAvatarUser from '@mobules/users/dtos/IUpdateAvatarUser'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

@injectable()
class UpdateAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IUpdateAvatarUser): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 404)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName)

    user.avatar = fileName

    await this.userRepository.save(user)

    return user
  }
}

export default UpdateAvatarUserService
