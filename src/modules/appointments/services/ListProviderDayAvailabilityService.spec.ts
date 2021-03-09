import 'reflect-metadata'
import ListProviderDayAvailabilityService from '@mobules/appointments/services/ListProviderDayAvailabilityService'
import FakeAppointmentsRepository from '@mobules/appointments/repositories/fakes/FakeAppointmentsRepository'

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    )
  })

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 3, 20, 10, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 3, 20, 14, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 3, 20, 15, 0, 0),
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2021, 3, 20, 11).getTime())

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2021,
      month: 3,
      day: 20,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 12, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    )
  })
})
