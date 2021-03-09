import Appointment from '@mobules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppintmentDTO from '@mobules/appointments/dtos/ICreateAppintmentDTO'
import IFindAllInMonthFromProviderDTO from '@mobules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@mobules/appointments/dtos/IFindAllInDayFromProviderDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppintmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>
}
