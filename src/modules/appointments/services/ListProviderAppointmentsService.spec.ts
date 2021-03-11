import ListProviderAppointmentsService from '@mobules/appointments/services/ListProviderAppointmentsService'
import FakeAppointmentsRepository from '@mobules/appointments/repositories/fakes/FakeAppointmentsRepository'

// import AppError from '@shared/errors/AppError'

let listProviderAppointmentsService: ListProviderAppointmentsService
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    )
  })

  it('should be able to list the appointments on a specific day', async () => {
    const appointment_1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2021, 4, 20, 14, 0, 0),
    })

    const appointment_2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2021, 4, 20, 15, 0, 0),
    })

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      day: 20,
      year: 2021,
      month: 4,
    })

    expect(appointments).toEqual([appointment_1, appointment_2])
  })
})
