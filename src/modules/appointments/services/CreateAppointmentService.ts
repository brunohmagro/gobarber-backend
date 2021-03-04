import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '@mobules/appointments/infra/typeorm/entities/Appointment'
import AppointmentsRepository from '@mobules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  date: Date
  provider_id: string
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is aleready booked')
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
