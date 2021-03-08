import FakeUsersRepository from '@mobules/users/repositories/fakes/FakeUserRepository'
import ShowProfileService from '@mobules/users/services/ShowProfileService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    showProfile = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    const profile = await showProfile.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('John Doe')
    expect(profile.email).toBe('john.doe@mail.com')
  })

  it('should not be able show the profile from non-exists user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-exists-user',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
