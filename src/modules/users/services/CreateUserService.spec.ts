import FakeUsersRepository from '@mobules/users/repositories/fakes/FakeUserRepository'
import FakeHashProvider from '@mobules/users/providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from '@mobules/users/services/CreateUserService'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHash: FakeHashProvider
let createUser: CreateUserService
let cacheProvider: FakeCacheProvider

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHash = new FakeHashProvider()
    cacheProvider = new FakeCacheProvider()
    createUser = new CreateUserService(fakeUsersRepository, fakeHash, cacheProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345',
    })

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john.doe@mail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
