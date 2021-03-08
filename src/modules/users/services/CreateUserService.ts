import { injectable, inject } from 'tsyringe'

import User from '@mobules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@mobules/users/dtos/ICreateUserDTO'
import IHashProvioder from '@mobules/users/providers/HashProvider/models/IHashProvider'

@injectable()
class CreateUserServive {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('BCryptProvider')
    private hashProvider: IHashProvioder,
  ) {}

  public async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email address already used', 401)
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}

export default CreateUserServive
