import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { HeaderComponent } from './header/header.component';
import { NotificationsService } from './notification-service/notifications.service';

const IMPORTS_EXPORTS = [
  AngularMaterialModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...IMPORTS_EXPORTS,
  ],
  providers: [
    NotificationsService,
  ],
  declarations: [HeaderComponent],
  exports: [
    ...IMPORTS_EXPORTS,
    HeaderComponent,
  ]
})
export class ClientSharedModule {}
