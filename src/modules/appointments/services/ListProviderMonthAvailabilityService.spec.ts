import ListProviderMonthAvailabilityService from '@mobules/appointments/services/ListProviderMonthAvailabilityService'
import FakeAppointmentsRepository from '@mobules/appointments/repositories/fakes/FakeAppointmentsRepository'

// import AppError from '@shared/errors/AppError'

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService
let fakeAppointmentsRepository: FakeAppointmentsRepository
let year: number
let month: number
let day: number

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    )
    year = new Date().getFullYear()
    month = new Date().getMonth()
    day = new Date().getDate()
  })

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month - 1, day, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day, 9, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day, 10, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day, 11, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day, 12, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day, 13, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day, 14, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day, 15, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day, 16, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day, 17, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day + 1, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(year, month, day - 1, 8, 0, 0),
    })

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user',
      year,
      month,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day, available: false },
        { day: day + 1, available: true },
        { day: day - 1, available: true },
        { day: day + 5, available: true },
      ]),
    )
  })
})
