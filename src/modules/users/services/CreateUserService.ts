import { hash } from 'bcryptjs'
import { injectable, inject } from 'tsyringe'

import User from '@mobules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@mobules/users/dtos/ICreateUserDTO'

@injectable()
class CreateUserServive {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email address already used', 401)
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}

export default CreateUserServive
