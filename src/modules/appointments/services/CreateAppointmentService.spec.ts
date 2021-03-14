import FakeAppointmentsRepository from '@mobules/appointments/repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from '@mobules/appointments/services/CreateAppointmentService'
import FakeNotificationsRepository from '@mobules/notifications/repositories/fakes/FakeNotificationsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService
let fakeNotificationsRepository: FakeNotificationsRepository
let cacheProvider: FakeCacheProvider

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    cacheProvider = new FakeCacheProvider()
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      cacheProvider,
    )
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2021, 2, 10, 13),
      user_id: '123123',
      provider_id: '12345',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('12345')
  })

  it('should not be able to create two appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 2, 10, 10).getTime()
    })

    await createAppointment.execute({
      date: new Date(2021, 2, 10, 13),
      user_id: '123123',
      provider_id: '12345',
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 10, 13),
        user_id: '123123',
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on the past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 10, 11),
        user_id: '123123',
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 10, 13),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 11, 7),
        user_id: '123123',
        provider_id: '1231',
      }),
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2021, 2, 11, 18),
        user_id: '123123',
        provider_id: '1231',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
