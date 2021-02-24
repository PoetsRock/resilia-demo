import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSharedModule } from '@client/shared';
import { ClientUserModule } from '@client/user';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ClientUserModule,
    ClientSharedModule,
  ],
  declarations: [DashboardComponent],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {}
