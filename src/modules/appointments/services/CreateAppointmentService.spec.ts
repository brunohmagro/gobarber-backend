import FakeAppointmentsRepository from '@mobules/appointments/repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from '@mobules/appointments/services/CreateAppointmentService'

import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '123123',
      provider_id: '12345',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('12345')
  })

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date()

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '12345',
    })

    expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123123',
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
