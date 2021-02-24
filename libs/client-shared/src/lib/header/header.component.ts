import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '@resilia-notifications/graphql-schema';
import { NotificationsService } from '../notification-service/notifications.service';

@Component({
  selector: 'resilia-notifications-header',
  template: `
    <section *ngIf="notifications$ | async as notifications">
      <mat-toolbar>
        <button mat-icon-button class='icon'>
          <mat-icon>menu</mat-icon>
        </button>
        <span class='spacer'></span>
        <div mat-button [matMenuTriggerFor]='notificationsmenu' class='notifications-icon'>
          <button mat-icon-button>
            <mat-icon>notifications</mat-icon>
            <span class='notification-counter'>
          {{ notifications.length }}
        </span>
          </button>
        </div>
      </mat-toolbar>

      <mat-menu #notificationsmenu='matMenu'
                [overlapTrigger]='false'
                class='notifications-dropdown'
                fxLayout
                fxLayoutAlign='center center'>

        <mat-card *ngFor='let notification of notifications'
                  fxLayout="column"
                  class='single-notification'>
          <div fxLayout fxLayoutAlign='space-between'>
            <div>
              {{ notification.message }}
            </div>
            <div>
              {{ notification.createdAt | date:'shortDate' }}
            </div>
          </div>
        </mat-card>

      </mat-menu>
    </section>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public notifications$: Observable<Notification[]> = this.notificationsService.notificationsByUser;

  public constructor(
    private readonly notificationsService: NotificationsService,
  ) {
  }

}
