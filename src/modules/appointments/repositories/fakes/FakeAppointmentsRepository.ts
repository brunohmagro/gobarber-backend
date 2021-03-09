import { v4 as uuid } from 'uuid'
import { isEqual, getMonth, getYear } from 'date-fns'

import Appointment from '@mobules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@mobules/appointments/repositories/IAppointmentsRepository'
import ICreateAppintmentDTO from '@mobules/appointments/dtos/ICreateAppintmentDTO'
import IFindAllInMonthFromProviderDTO from '@mobules/appointments/dtos/IFindAllInMonthFromProviderDTO'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date))
    return findAppointment
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) === month &&
        getYear(appointment.date) === year,
    )
    return appointments
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
