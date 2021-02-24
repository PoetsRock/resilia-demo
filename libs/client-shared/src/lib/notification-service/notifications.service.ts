import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { ClientUserService, User } from '@client/user';
import { CreateNotificationsInput, Notification } from '@resilia-notifications/graphql-schema';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { CREATE_NOTIFICATIONS, FETCH_NOTIFICATIONS_BY_USER, SUBSCRIBE_NOTIFICATIONS_BY_USER } from './graphql.types';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationsByUser$: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);

  public get notificationsByUser(): Observable<Notification[]> {
    if (this.notificationsByUser$.value.length === 0) {
      this.queryNotificationsByUser();
    }
    return this.notificationsByUser$.asObservable();
  }

  public constructor(
    private readonly clientUserService: ClientUserService,
    private readonly apollo: Apollo,
  ) {
    this.subscribeNotificationsByUser();
  }

  public createNotifications({ category, senderId, recipientId, message }: CreateNotificationsInput) {
    console.log('recipientIds: ', recipientId);

    recipientId
    this.apollo.mutate({
      variables: {
        createNotificationsInput: {
          recipientId,
          senderId,
          category,
          message
        }
      },
      mutation: CREATE_NOTIFICATIONS,
    })
    .pipe(
      take(1)
    )
    .subscribe();
  }

  private queryNotificationsByUser(): void {
    this.clientUserService.user$
    .pipe(
      switchMap((user: User) => this.apollo.watchQuery({
        variables: { recipientId: user.id },
        query: FETCH_NOTIFICATIONS_BY_USER
      })
      .valueChanges
      .pipe(
        tap((notifications: ApolloQueryResult<{ notificationsByRecipientId: Notification[] }>) => {
          this.notificationsByUser$.next(notifications.data.notificationsByRecipientId)
        })
      ))
    )
    .subscribe();
  }

  private subscribeNotificationsByUser(): void {
    this.apollo.subscribe(
      { query: SUBSCRIBE_NOTIFICATIONS_BY_USER, variables: { recipientId: this.clientUserService.user.id }}
      )
      .pipe(
        tap((notification: FetchResult<{ notificationCreated: Notification }>) => {
          const updatedNotifications: Notification[] = [...this.notificationsByUser$.value];
          updatedNotifications.push(notification.data.notificationCreated);
          this.notificationsByUser$.next(updatedNotifications);
        })
      )
      .subscribe()
  }
}
