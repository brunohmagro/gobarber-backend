import { startOfHour } from 'date-fns'

import Appointment from '@mobules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@mobules/appointments/repositories/IAppointmentsRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  date: Date
  provider_id: string
}

class CreateAppointmentService {
  constructor(private appointmentRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is aleready booked')
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
