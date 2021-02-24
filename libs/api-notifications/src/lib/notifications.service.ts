import { Inject, Injectable, Logger } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import { Cursor, FilterQuery, InsertOneWriteOpResult, InsertWriteOpResult, ObjectId } from 'mongodb';
import { DatabaseService } from '@resilia-notifications/database';
import { CreateNotificationInput, CreateNotificationsInput, Notification } from '@resilia-notifications/graphql-schema';

export const NOTIFICATIONS_SUBSCRIPTION = 'notificationCreated';
const NOTIFICATIONS_COLLECTION = 'notifications';

@Injectable()
export class NotificationsService {
  private logger: Logger = new Logger('notifications-service');

  public constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private dbService: DatabaseService
  ) {}

  public async createOne(notification: CreateNotificationInput): Promise<Notification | { error: Error }> {
    const updatedNotification = Object.assign({}, notification, {
      createdAt: new Date().toDateString(),
      isDelete: false,
      isRead: false,
    })
    try {
      const insertNotification: InsertOneWriteOpResult<Notification> = await this.dbService.db.collection(NOTIFICATIONS_COLLECTION).insertOne(updatedNotification);
      return insertNotification.ops[0];
    } catch (e) {
      this.logger.error(e);
      return { error: e };
    }
  }

  public async createMany(notification: CreateNotificationsInput): Promise<Notification[] | { error: Error }> {
    const notifications: CreateNotificationsInput[] = notification.recipientId.map((recipientId: string) => {
      return Object.assign({}, notification, {
        createdAt: new Date().toDateString(),
        isDelete: false,
        isRead: false,
        recipientId
      });
    });
    try {
      const insertNotifications: InsertWriteOpResult<Notification> = await this.dbService.db.collection(NOTIFICATIONS_COLLECTION).insertMany(notifications);
      const updatePayload = { notificationCreated: insertNotifications.ops };
      await this.pubSub.publish(NOTIFICATIONS_SUBSCRIPTION, updatePayload);
      return insertNotifications.ops;
    } catch (e) {
      this.logger.error(e);
      return { error: e };
    }
  }

  public async findOne(id: string): Promise<Notification | { error: Error }> {
    try {
      const _id = new ObjectId(id);
      return await this.dbService.db.collection(NOTIFICATIONS_COLLECTION).findOne({ _id });
    } catch (e) {
      this.logger.error(e);
      return { error: e }
    }
  }

  public async find(): Promise<Notification[] | { error: Error }> {
    try {
      const findAllNotifications: Cursor<any> = this.dbService.db.collection(NOTIFICATIONS_COLLECTION).find();
      return await findAllNotifications.toArray();
    } catch (e) {
      this.logger.error(e);
      return { error: e }
    }
  }

  public async findByRecipientId(recipientId: string): Promise<Notification[] | { error: Error }> {
    try {
      const queryFilter: FilterQuery<{ _id: string[] }> = { recipientId };
      const findAllNotifications: Cursor<Notification> = this.dbService.db.collection(NOTIFICATIONS_COLLECTION).find(queryFilter);
      return await findAllNotifications.toArray();
    } catch (e) {
      this.logger.error(e);
      return { error: e }
    }
  }
}
