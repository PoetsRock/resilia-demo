import { gql } from 'apollo-angular';

export const SUBSCRIBE_NOTIFICATIONS_BY_USER = gql`
  subscription notificationCreated($recipientId: String!) {
    notificationCreated(recipientId: $recipientId) {
      _id,
      isRead,
      createdAt,
      senderId,
      createdAt,
      recipientId,
      message,
      category
    }
  }
`;

export const FETCH_NOTIFICATIONS_BY_USER = gql`
  query notificationsByRecipientId($recipientId: String!) {
    notificationsByRecipientId(recipientId: $recipientId) {
      _id,
      category,
      createdAt,
      isRead,
      message,
      recipientId,
      senderId,
      updateAt,
    }
  }
`;

export const CREATE_NOTIFICATIONS = gql`
  mutation createNotifications($createNotificationsInput: CreateNotificationsInput!) {
    createNotifications(createNotificationsInput: $createNotificationsInput) {
      _id,
      category,
      createdAt,
      isRead,
      message,
      recipientId,
      senderId,
      updateAt,
    }
  }
`
