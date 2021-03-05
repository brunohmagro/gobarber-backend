import { v4 as uuid } from 'uuid'
import { isEqual } from 'date-fns'

import Appointment from '@mobules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@mobules/appointments/repositories/IAppointmentsRepository'
import ICreateAppintmentDTO from '@mobules/appointments/dtos/ICreateAppintmentDTO'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date))
    return findAppointment
  }

  public async create({ provider_id, date }: ICreateAppintmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
    })

    this.appointments.push(appointment)

    return appointment
  }
}

export default FakeAppointmentsRepository
