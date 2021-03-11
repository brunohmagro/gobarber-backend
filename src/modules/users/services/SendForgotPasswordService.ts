import { injectable, inject } from 'tsyringe'
import path from 'path'

// import User from '@mobules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@mobules/users/repositories/IUserTokensRepository'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/resetar-senha?token=${token}`,
        },
      },
    })
  }
}

export default SendForgotPasswordService
