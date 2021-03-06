import FakeUsersRepository from '@mobules/users/repositories/fakes/FakeUserRepository'
import FakeUserTokensRepository from '@mobules/users/repositories/fakes/FakeUserTokensRepository'

import AppError from '@shared/errors/AppError'
import ResetPasswordService from './ResetPasswordService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let resetPasswordService: ResetPasswordService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    resetPasswordService = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository)
  })

  it('should be able to reset the password', async () => {
    let user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '112345',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    await resetPasswordService.execute({
      password: '123456',
      confirmPassword: '123456',
      token,
    })

    user = await fakeUsersRepository.findById(user.id)

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
})
