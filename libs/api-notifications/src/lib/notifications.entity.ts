import { Notification } from '@resilia-notifications/graphql-schema';
import { IsDate, IsNotEmpty } from 'class-validator';

enum NotificationCategory {
  FUNDING = 'FUNDING',
  NONPROFIT_ORG_ADDED = 'NONPROFIT_ORG_ADDED',
  NONPROFIT_USER_ADDED = 'NONPROFIT_USER_ADDED',
}

export class NotificationClass extends Notification {
  @IsNotEmpty()
  _id!: string;

  @IsNotEmpty()
  senderId!: string;

  @IsNotEmpty()
  recipientId!: string;

  @IsNotEmpty()
  message!: string;

  category!: NotificationCategory;

  @IsDate()
  createdAt = new Date().toDateString();

  isRead = false;

  constructor() {
    super();
  }

}
