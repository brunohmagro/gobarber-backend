import Appointment from '@mobules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppintmentDTO from '@mobules/appointments/dtos/ICreateAppintmentDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppintmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}
