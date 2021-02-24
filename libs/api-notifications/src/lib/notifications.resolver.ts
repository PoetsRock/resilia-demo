import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateNotificationInput, CreateNotificationsInput, Notification } from '@resilia-notifications/graphql-schema';
import { PubSubEngine } from 'graphql-subscriptions';
import { NotificationsService } from './notifications.service';


@Resolver('Notification')
export class NotificationsResolver {
  private logger: Logger = new Logger('notifications-resolver');

  public constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Query('notification')
  public async notification(@Args('_id') id: string): Promise<Notification | { error: Error }> {
    try {
      return this.notificationsService.findOne(id);
    } catch (e) {
      return e;
    }
  }

  @Query('notifications')
  public async notifications(): Promise<Notification[] | { error: Error }> {
    try {
      return this.notificationsService.find();
    } catch (e) {
      return e;
    }
  }

  @Query('notificationsByRecipientId')
  public async notificationsByRecipientId(@Args('recipientId') recipientId: string): Promise<Notification[] | { error: Error }> {
    try {
      return this.notificationsService.findByRecipientId(recipientId);
    } catch (e) {
      return e;
    }
  }

  @Mutation('createNotification')
  public async createNotification(@Args('createNotificationInput') createNotificationInput: CreateNotificationInput): Promise<Notification | { error: Error }> {
    try {
      return await this.notificationsService.createOne(createNotificationInput);
    } catch (e) {
      return e;
    }
  }

  @Mutation('createNotifications')
  public async createNotifications(@Args('createNotificationsInput') createNotificationsInput: CreateNotificationsInput): Promise<Notification[] | { error: Error }> {
    try {
      return await this.notificationsService.createMany(createNotificationsInput);
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  @Subscription('notificationCreated', {
    filter: ((payload, variables) => {
      return payload.notificationCreated.find((notification: Notification) => notification.recipientId === variables.recipientId)
    }),
    resolve(this: NotificationsResolver, payload: { notificationCreated: Notification[] }, args: { [key: string]: string }): Notification | void {
      const notification = payload.notificationCreated.find((notification: Notification) => notification.recipientId === args.recipientId);
      return notification;
      // const notification = payload.notificationCreated.find((notification: Notification) => notification.recipientId === args.recipientId) ?? null;
      // console.log('notification:\n', notification);
      // if (notification !== null) {
      //   return notification;
      // }
    }
  })
  notificationCreated(): AsyncIterator<Notification> {
    return this.pubSub.asyncIterator('notificationCreated');
  }
}
