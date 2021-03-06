import { injectable, inject } from 'tsyringe'

// import User from '@mobules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@mobules/users/repositories/IUserTokensRepository'

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

    user.password = password

    await this.userRepository.save(user)
  }
}

export default ResetPasswordService
