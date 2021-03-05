import { container } from 'tsyringe'

import '@mobules/users/providers'
import '@shared/container/providers'

import IAppointmentRepository from '@mobules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@mobules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import UsersRepository from '@mobules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
)

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
