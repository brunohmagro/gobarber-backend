import { container } from 'tsyringe'

import '@mobules/users/providers'
import '@shared/container/providers'

import IAppointmentRepository from '@mobules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@mobules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '@mobules/users/repositories/IUsersRepository'
import UsersRepository from '@mobules/users/infra/typeorm/repositories/UsersRepository'

import IUserTokensRepository from '@mobules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@mobules/users/infra/typeorm/repositories/UserTokensRepository'

import INotificationsRepository from '@mobules/notifications/repositories/INotificationsRepository'
import NotificationsRepository from '@mobules/notifications/infra/typeorm/repositories/NotificationsRepository'

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
)

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
)
