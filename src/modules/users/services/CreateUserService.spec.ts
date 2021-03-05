import FakeUsersRepository from '@mobules/users/repositories/fakes/FakeUserRepository'
import FakeHashProvider from '@mobules/users/providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from '@mobules/users/services/CreateUserService'
import AppError from '@shared/errors/AppError'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsersRepository, fakeHash)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email another', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsersRepository, fakeHash)

    await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345',
    })

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john.doe@mail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
