import { injectable, inject } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@mobules/users/repositories/IUserTokensRepository'
import IHashProvider from '@mobules/users/providers/HashProvider/models/IHashProvider'

interface IRequest {
  token: string
  password: string
  confirmPassword: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('BCryptProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password, confirmPassword }: IRequest): Promise<void> {
    if (password !== confirmPassword) {
      throw new AppError('Password and password confirmation does not match')
    }

    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists')
    }

    const user = await this.userRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.userRepository.save(user)
  }
}

export default ResetPasswordService
