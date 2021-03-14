import FakeUsersRepository from '@mobules/users/repositories/fakes/FakeUserRepository'
import FakeHashProvider from '@mobules/users/providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from '@mobules/users/services/AuthenticateUserService'
import CreateUserService from '@mobules/users/services/CreateUserService'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHash: FakeHashProvider
let createUser: CreateUserService
let authenticateUser: AuthenticateUserService
let cacheProvider: FakeCacheProvider

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHash = new FakeHashProvider()
    cacheProvider = new FakeCacheProvider()
    createUser = new CreateUserService(fakeUsersRepository, fakeHash, cacheProvider)
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHash)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345',
    })

    const response = await authenticateUser.execute({
      email: 'john.doe@mail.com',
      password: '12345',
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not authenticate user not found', async () => {
    await expect(
      authenticateUser.execute({
        email: 'john.doe1@mail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not authenticate user when password doesn`t match', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345',
    })

    await expect(
      authenticateUser.execute({
        email: 'john.doe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
