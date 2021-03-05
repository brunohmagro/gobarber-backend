import FakeUsersRepository from '@mobules/users/repositories/fakes/FakeUserRepository'
import FakeHashProvider from '@mobules/users/providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from '@mobules/users/services/AuthenticateUserService'
import CreateUserService from '@mobules/users/services/CreateUserService'
import AppError from '@shared/errors/AppError'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsersRepository, fakeHash)
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHash)

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
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHash)

    expect(
      authenticateUser.execute({
        email: 'john.doe1@mail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not authenticate user when password doesn`t match', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsersRepository, fakeHash)
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHash)

    await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345',
    })

    expect(
      authenticateUser.execute({
        email: 'john.doe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
