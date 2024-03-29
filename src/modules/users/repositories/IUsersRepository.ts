import User from '@mobules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '@mobules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@mobules/users/dtos/IFindAllProvidersDTO'

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
