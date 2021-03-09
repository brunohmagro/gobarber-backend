import { v4 as uuid } from 'uuid'

import User from '@mobules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '@mobules/users/dtos/ICreateUserDTO'
import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import IFindAllProvidersDTO from '@mobules/users/dtos/IFindAllProvidersDTO'

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id)
    }

    return users
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id)
    return findUser
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email)
    return findUser
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid(), name, email, password })

    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[findIndex] = user

    return user
  }
}

export default FakeUsersRepository
