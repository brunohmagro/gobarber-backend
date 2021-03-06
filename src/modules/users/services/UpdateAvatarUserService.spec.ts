import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUsersRepository from '@mobules/users/repositories/fakes/FakeUserRepository'
import UpdateAvatarUserService from '@mobules/users/services/UpdateAvatarUserService'
import CreateUserServive from '@mobules/users/services/CreateUserService'
import FakeHashProvider from '@mobules/users/providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError'

describe('UpdateAvatarUser', () => {
  it('should be able to update avatar to a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()
    const createUser = new CreateUserServive(fakeUsersRepository, fakeHash)
    const fakeStorage = new FakeStorageProvider()
    const updateAvatar = new UpdateAvatarUserService(fakeUsersRepository, fakeStorage)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    })

    expect(user.avatar).toEqual('avatar.jpg')
  })

  it('should not be able to update avatar to a user if user not exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorage = new FakeStorageProvider()
    const updateAvatar = new UpdateAvatarUserService(fakeUsersRepository, fakeStorage)

    expect(
      updateAvatar.execute({
        user_id: 'same-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()
    const fakeStorage = new FakeStorageProvider()

    const deleteFile = jest.spyOn(fakeStorage, 'deleteFile')

    const createUser = new CreateUserServive(fakeUsersRepository, fakeHash)
    const updateAvatar = new UpdateAvatarUserService(fakeUsersRepository, fakeStorage)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    })

    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'another-avatar.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toEqual('another-avatar.jpg')
  })
})
