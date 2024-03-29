import { getMongoRepository, MongoRepository } from 'typeorm'

import INotificationsRepository from '@mobules/notifications/repositories/INotificationsRepository'
import Notification from '@mobules/notifications/infra/typeorm/schemas/Notification'
import ICreateNotificationDTO from '@mobules/notifications/dtos/ICreateNotificationDTO'

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo')
  }

  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipient_id })

    await this.ormRepository.save(notification)

    return notification
  }
}

export default NotificationsRepository
