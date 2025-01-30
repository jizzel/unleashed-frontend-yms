import {Component, inject, OnInit} from '@angular/core';
import {DashboardResponse, Form, FormStatus} from '../../../../core/models/admin.interface';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {AdminActions} from '../../store/actions/admin.actions';
import {FormDetailDialogComponent} from '../../components/form-detail-dialog/form-detail-dialog.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {selectDashboard} from '../../store/selectors/admin.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private store = inject(Store);
  FormStatus = FormStatus;
  dashboard$: Observable<DashboardResponse | null>;
  displayedColumns = ['userName', 'email', 'status', 'submissionDate', 'actions'];

  filters = {
    status: FormStatus.IN_PROGRESS,
    page: 1,
    limit: 10,
    search: ''
  };

  constructor(
    private dialog: MatDialog
  ) {
    this.dashboard$ = this.store.select(selectDashboard);
  }

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.store.dispatch(AdminActions.loadDashboard(this.filters));
  }

  onPageChange(event: any) {
    this.filters.page = event.pageIndex + 1;
    this.filters.limit = event.pageSize;
    this.loadDashboard();
  }

  exportForms() {
    this.store.dispatch(AdminActions.exportForms({
      status: this.filters.status || undefined,
      fromDate: new Date().toISOString().split('T')[0], // Current date
      toDate: new Date().toISOString().split('T')[0]
    }));
  }

  viewForm(form: Form) {
    this.dialog.open(FormDetailDialogComponent, {
      width: '800px',
      data: { form, mode: 'view' }
    });
  }

  editForm(form: Form) {
    const dialogRef = this.dialog.open(FormDetailDialogComponent, {
      width: '800px',
      data: { form, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(AdminActions.updateForm({
          id: form.id,
          data: result
        }));
      }
    });
  }

  approveForm(form: Form) {
    this.store.dispatch(AdminActions.approveForm({ id: form.id }));
  }

  deleteForm(form: Form) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Form',
        message: 'Are you sure you want to delete this form? This action cannot be undone.'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(AdminActions.deleteForm({ id: form.id }));
      }
    });
  }

  getStatusColor(status: FormStatus): string {
    switch (status) {
      case FormStatus.APPROVED:
        return 'accent';
      case FormStatus.SUBMITTED:
        return 'primary';
      case FormStatus.IN_PROGRESS:
        return 'warn';
      default:
        return '';
    }
  }
}
