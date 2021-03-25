import { injectable, inject } from 'tsyringe'
import { classToClass } from 'class-transformer'

import User from '@mobules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  user_id: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(`providers-list:${user_id}`)

    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      })

      if (users.length === 0) {
        throw new AppError('Providers not founds', 404)
      }

      await this.cacheProvider.save(`providers-list:${user_id}`, classToClass(users))
    }

    return users
  }
}

export default ListProvidersService
