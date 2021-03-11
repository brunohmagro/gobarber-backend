import ICreateNotificationDTO from '@mobules/notifications/dtos/ICreateNotificationDTO'
import Notification from '@mobules/notifications/infra/typeorm/schemas/Notification'

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>
}
