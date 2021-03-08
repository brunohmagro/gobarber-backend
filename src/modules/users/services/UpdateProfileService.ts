import { injectable, inject } from 'tsyringe'

import User from '@mobules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import IHashProvioder from '@mobules/users/providers/HashProvider/models/IHashProvider'

interface IRequest {
  user_id: string
  name: string
  email: string
  oldPassword?: string
  password?: string
  confirmationPassword?: string
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('BCryptProvider')
    private hashProvider: IHashProvioder,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    oldPassword,
    password,
    confirmationPassword,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Email already in use')
    }

    if (password && !oldPassword) {
      throw new AppError('You need to inform the old password to set a new password')
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(oldPassword, user.password)

      if (!checkOldPassword) {
        throw new AppError('Old password does not match')
      }
    }

    if (password && password !== confirmationPassword) {
      throw new AppError('Confirmation password does not match')
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password)
    }

    user.name = name
    user.email = email

    return this.userRepository.save(user)
  }
}

export default UpdateProfileService
