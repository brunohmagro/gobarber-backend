import FakeUsersRepository from '@mobules/users/repositories/fakes/FakeUserRepository'
import UpdateProfileService from '@mobules/users/services/UpdateProfileService'
import CreateUserServive from '@mobules/users/services/CreateUserService'
import FakeHashProvider from '@mobules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHash: FakeHashProvider
let createUser: CreateUserServive
let updateProfile: UpdateProfileService
let cacheProvider: FakeCacheProvider

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHash = new FakeHashProvider()
    cacheProvider = new FakeCacheProvider()
    createUser = new CreateUserServive(fakeUsersRepository, fakeHash, cacheProvider)
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHash)
  })

  it('should be able to update the profile', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Snow',
      email: 'john.snow@mail.com.br',
    })

    expect(updatedUser.name).toBe('John Snow')
    expect(updatedUser.email).toBe('john.snow@mail.com.br')
  })

  it('should not be able to update the profile when user not found', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-exists-user',
        name: 'John Snow',
        email: 'john.snow@mail.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change email if this email exists', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    })

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Snow',
        email: 'johndoe@mail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123123',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Snow',
      email: 'john.snow@mail.com.br',
      oldPassword: '123123',
      password: '123456',
      confirmationPassword: '123456',
    })

    expect(updatedUser.password).toBe('123456')
  })

  it('should not be able to update the password if oldPassword is empty', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123123',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Snow',
        email: 'john.snow@mail.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password without confirm password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123123',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Snow',
        email: 'john.snow@mail.com.br',
        oldPassword: '123123',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123123',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Snow',
        email: 'john.snow@mail.com.br',
        oldPassword: 'wrong-password',
        password: '123456',
        confirmationPassword: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
