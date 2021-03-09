import { injectable, inject } from 'tsyringe'

import User from '@mobules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@mobules/users/repositories/IUsersRepository'

interface IRequest {
  user_id: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const user = await this.userRepository.findAllProviders({
      except_user_id: user_id,
    })

    if (!user) {
      throw new AppError('Users not found', 404)
    }

    return user
  }
}

export default ListProvidersService
