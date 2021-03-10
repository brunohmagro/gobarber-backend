import { startOfHour, isBefore, getHours } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import Appointment from '@mobules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@mobules/appointments/repositories/IAppointmentsRepository'
import ICreateAppintmentDTO from '@mobules/appointments/dtos/ICreateAppintmentDTO'
import AppError from '@shared/errors/AppError'

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, provider_id, user_id }: ICreateAppintmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date")
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself")
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can create an appointment between 8am and 5pm')
    }

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is aleready booked')
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
