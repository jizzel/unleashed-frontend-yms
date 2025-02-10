import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, mergeMap, tap} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AdminActions } from '../actions/admin.actions';
import {AdminService} from '../../../../core/services/admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class AdminEffects {
  private actions$ =  inject(Actions);

  loadDashboard$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.loadDashboard),
    mergeMap(({ status, page, limit, search }) =>
      this.adminService.getDashboard({ status, page, limit, search }).pipe(
        map(response => AdminActions.loadDashboardSuccess({ response })),
        catchError(error => of(AdminActions.loadDashboardFailure({ error })))
      )
    )
  ));

  loadAdminUsers$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.loadAdminUsers),
    mergeMap(({ role, page, limit, search }) =>
      this.adminService.getAdminUsers({ role, page, limit, search }).pipe(
        map(response => AdminActions.loadAdminUsersSuccess({ response })),
        catchError(error => of(AdminActions.loadAdminUsersFailure({ error })))
      )
    )
  ));


  registerAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.registerAdmin),
    mergeMap(({ firstName, email }) =>
      this.adminService.registerAdmin({ firstName, email }).pipe(
        map(user => AdminActions.registerAdminSuccess({ user })),
        catchError(error => of(AdminActions.registerAdminFailure({ error })))
      )
    )
  ));

  updateAdminRole$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.updateAdminRole),
    mergeMap(({ userId, role }) =>
      this.adminService.updateAdminRole(userId, role).pipe(
        map(user => AdminActions.updateAdminRoleSuccess({ user })),
        catchError(error => of(AdminActions.updateAdminRoleFailure({ error })))
      )
    )
  ));

  loadForm$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.loadForm),
    mergeMap(({ id }) =>
      this.adminService.getForm(id).pipe(
        map(form => AdminActions.loadFormSuccess({ form })),
        catchError(error => of(AdminActions.loadFormFailure({ error })))
      )
    )
  ));

  updateForm$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.updateForm),
    mergeMap(({ id, data }) =>
      this.adminService.updateForm(id, data).pipe(
        map(form => AdminActions.updateFormSuccess({ form })),
        catchError(error => of(AdminActions.updateFormFailure({ error })))
      )
    )
  ));

  deleteForm$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.deleteForm),
    mergeMap(({ id }) =>
      this.adminService.deleteForm(id).pipe(
        map(() => AdminActions.deleteFormSuccess({ id })),
        catchError(error => of(AdminActions.deleteFormFailure({ error })))
      )
    )
  ));

  approveForm$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.approveForm),
    mergeMap(({ id }) =>
      this.adminService.approveForm(id).pipe(
        map(form => AdminActions.approveFormSuccess({ form })),
        catchError(error => of(AdminActions.approveFormFailure({ error })))
      )
    )
  ));

  exportForms$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.exportForms),
    mergeMap(({ fromDate, toDate, status }) =>
      this.adminService.exportForms({ fromDate, toDate, status }).pipe(
        map(blob => AdminActions.exportFormsSuccess({ blob })),
        catchError(error => of(AdminActions.exportFormsFailure({ error })))
      )
    )
  ));

  loadAuditLogs$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.loadAuditLogs),
    mergeMap(({ page, limit }) =>
      this.adminService.getAuditLogs({ page, limit }).pipe(
        map(response => AdminActions.loadAuditLogsSuccess({ response })),
        catchError(error => of(AdminActions.loadAuditLogsFailure({ error })))
      )
    )
  ));

  // Success notifications
  showSuccessNotification$ = createEffect(() => this.actions$.pipe(
    ofType(
      AdminActions.registerAdminSuccess,
      AdminActions.updateAdminRoleSuccess,
      AdminActions.updateFormSuccess,
      AdminActions.approveFormSuccess,
      AdminActions.deleteFormSuccess
    ),
    tap(action => {
      let message = 'Operation completed successfully';
      if (action.type === AdminActions.registerAdminSuccess.type) {
        message = 'Admin registered successfully';
      } else if (action.type === AdminActions.updateAdminRoleSuccess.type) {
        message = 'Admin role updated successfully';
      } else if (action.type === AdminActions.updateFormSuccess.type) {
        message = 'Form updated successfully';
      } else if (action.type === AdminActions.approveFormSuccess.type) {
        message = 'Form approved successfully';
      } else if (action.type === AdminActions.deleteFormSuccess.type) {
        message = 'Form deleted successfully';
      }
      this.snackBar.open(message, 'Close', { duration: 3000 });
    })
  ), { dispatch: false });

  // Error notifications
  showErrorNotification$ = createEffect(() => this.actions$.pipe(
    ofType(
      AdminActions.registerAdminFailure,
      AdminActions.updateAdminRoleFailure,
      AdminActions.updateFormFailure,
      AdminActions.approveFormFailure,
      AdminActions.deleteFormFailure,
      AdminActions.exportFormsFailure
    ),
    tap(action => {
      const error = action['error'];
      const message = error?.message || 'An error occurred';
      this.snackBar.open(message, 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    })
  ), { dispatch: false });





  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}
}
