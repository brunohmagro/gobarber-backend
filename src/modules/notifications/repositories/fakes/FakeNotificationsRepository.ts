import { ObjectID } from 'mongodb'

import INotificationsRepository from '@mobules/notifications/repositories/INotificationsRepository'
import Notification from '@mobules/notifications/infra/typeorm/schemas/Notification'
import ICreateNotificationDTO from '@mobules/notifications/dtos/ICreateNotificationDTO'

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = []

  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, { id: new ObjectID(), content, recipient_id })

    this.notifications.push(notification)

    return notification
  }
}

export default NotificationsRepository
