import { Notification } from '@resilia-notifications/graphql-schema';

export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  notifications?: Notification[];
}
