import { getRepository, Repository } from 'typeorm'

import IAppointmentsRepository from '@mobules/appointments/repositories/IAppointmentsRepository'
import Appointment from '@mobules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppintmentDTO from '@mobules/appointments/dtos/ICreateAppintmentDTO'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    })

    return findAppointment
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppintmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date })

    await this.ormRepository.save(appointment)

    return appointment
  }
}

export default AppointmentsRepository
