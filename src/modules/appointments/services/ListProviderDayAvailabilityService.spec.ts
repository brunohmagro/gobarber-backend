import 'reflect-metadata'
import ListProviderDayAvailabilityService from '@mobules/appointments/services/ListProviderDayAvailabilityService'
import FakeAppointmentsRepository from '@mobules/appointments/repositories/fakes/FakeAppointmentsRepository'

// import AppError from '@shared/errors/AppError'

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService
let fakeAppointmentsRepository: FakeAppointmentsRepository
let year: number
let month: number
let day: number

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    )
    year = new Date().getFullYear()
    month = new Date().getMonth()
    day = new Date().getDate()
  })

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(year, month, day, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(year, month, day, 10, 0, 0),
    })

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year,
      month,
      day,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    )
  })
})
