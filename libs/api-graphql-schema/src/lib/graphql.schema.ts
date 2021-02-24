
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum NotificationCategory {
    FUNDING = "FUNDING",
    NONPROFIT_ORG_ADDED = "NONPROFIT_ORG_ADDED",
    NONPROFIT_USER_ADDED = "NONPROFIT_USER_ADDED"
}

export class CreateNotificationInput {
    category: string;
    message: string;
    recipientId: string;
    senderId?: string;
}

export class CreateNotificationsInput {
    category: NotificationCategory;
    message: string;
    recipientId: string[];
    senderId?: string;
}

export abstract class IQuery {
    abstract notification(_id?: string): Notification | Promise<Notification>;

    abstract notifications(): Notification[] | Promise<Notification[]>;

    abstract notificationsByRecipientId(recipientId?: string): Notification[] | Promise<Notification[]>;
}

export abstract class IMutation {
    abstract createNotification(createNotificationInput: CreateNotificationInput): Notification | Promise<Notification>;

    abstract createNotifications(createNotificationsInput: CreateNotificationsInput): Notification[] | Promise<Notification[]>;
}

export abstract class ISubscription {
    abstract notificationCreated(recipientId: string): Notification | Promise<Notification>;
}

export class Notification {
    _id: string;
    category: string;
    createdAt: string;
    isDeleted: boolean;
    isRead: boolean;
    message?: string;
    recipientId: string;
    senderId?: string;
    updateAt?: string;
}
