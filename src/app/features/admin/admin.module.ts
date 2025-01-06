import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormTableComponent } from './components/form-table/form-table.component';
import { AdminManagementComponent } from './components/admin-management/admin-management.component';


@NgModule({
  declarations: [
    AdminComponent,
    ProfileComponent,
    DashboardComponent,
    FormTableComponent,
    AdminManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
