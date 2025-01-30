import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormTableComponent } from './components/form-table/form-table.component';
import { AdminManagementComponent } from './components/admin-management/admin-management.component';
import { StoreModule } from '@ngrx/store';
import * as fromAdmin from './store/reducers/admin.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './store/effects/admin.effects';
import { FormDetailDialogComponent } from './components/form-detail-dialog/form-detail-dialog.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableModule
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatPaginator} from '@angular/material/paginator';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    AdminComponent,
    ProfileComponent,
    DashboardComponent,
    FormTableComponent,
    AdminManagementComponent,
    FormDetailDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    StoreModule.forFeature(fromAdmin.adminFeatureKey, fromAdmin.reducer),
    EffectsModule.forFeature([AdminEffects]),
    MatTableModule,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatCardHeader,
    MatCard,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatInput,
    FormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatCellDef,
    MatHeaderCellDef,
    MatMenu,
    MatMenuItem,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
    MatSelect,
    MatOption,
    MatTable,
    MatFormFieldModule,
    MatChipsModule
  ]
})
export class AdminModule { }
