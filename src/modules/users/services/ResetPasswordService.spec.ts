import FakeUsersRepository from '@mobules/users/repositories/fakes/FakeUserRepository'
import FakeUserTokensRepository from '@mobules/users/repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '@mobules/users/providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'
import ResetPasswordService from './ResetPasswordService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let resetPasswordService: ResetPasswordService
let fakeHashProvider: FakeHashProvider

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    )
  })

  it('should be able to reset the password', async () => {
    let user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '112345',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPasswordService.execute({
      password: '123456',
      confirmPassword: '123456',
      token,
    })

    user = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('123456')
    expect(user.password).toBe('123456')
  })

  it('should not be able to reset when password does not match with confirmPassword', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '112345',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    await expect(
      resetPasswordService.execute({
        password: '123456',
        confirmPassword: 'anotherPassword',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '123456',
        confirmPassword: '123456',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existing-user')

    await expect(
      resetPasswordService.execute({
        password: '123456',
        confirmPassword: '123456',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '112345',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPasswordService.execute({
        password: '123456',
        confirmPassword: '123456',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
