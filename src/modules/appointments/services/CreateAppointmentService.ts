import { startOfHour } from 'date-fns'
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

  public async execute({ date, provider_id }: ICreateAppintmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate)

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
