import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from '@client/shared';

@Component({
  selector: 'resilia-notifications-dashboard',
  template: `
    <section fxLayout='column' fxLayoutAlign>
      <resilia-notifications-header></resilia-notifications-header>

      <section class='notification-form' fxLayout='column' fxLayoutAlign='start center'>
        <div class='sub-header'>Create a Notification</div>
        <form [formGroup]='createNotificationForm' fxLayout='column' fxLayoutAlign='start flex-start' fxLayoutGap='16px'>
          <mat-form-field>
            <input matInput
                   formControlName='recipientIdsAsString'
                   placeholder='Send To'
            >
          </mat-form-field>

          <mat-form-field>
            <mat-label>Message</mat-label>
            <textarea matInput
                      formControlName='message'
                      placeholder='Notification message'></textarea>
          </mat-form-field>
<!--          <mat-form-field></mat-form-field>-->
<!--          <mat-form-field></mat-form-field>-->
          <button mat-raised-button (click)='submitNotification()'>Send</button>
        </form>
        <div class='note'>
          Currently, the "logged-in" userId is set to "2". So, you will need
          to use this value to see notifications appear in the UI

        </div>
      </section>
    </section>
  `,
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  public createNotificationForm: FormGroup = this.formBuilder.group({
    recipientIdsAsString: ['', Validators.required],
    recipientId: [[]],
    message: ['', Validators.required],
    category: ['FUNDING', Validators.required],
    senderId: ['1', Validators.required],
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationsService: NotificationsService
  ) {}

  public submitNotification() {
    const recipientId: string[] = this.createNotificationForm.value.recipientIdsAsString.split(',');
    this.notificationsService.createNotifications({
      recipientId,
      category: this.createNotificationForm.value.category,
      message: this.createNotificationForm.value.message,
      senderId: this.createNotificationForm.value.senderId
    })
  }

}
