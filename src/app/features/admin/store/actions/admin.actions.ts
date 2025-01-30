import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {AdminUser, AuditLogResponse, DashboardResponse, Form, UserRole} from '../../../../core/models/admin.interface';

export const AdminActions = createActionGroup({
  source: 'admin',
  events: {
    'Load Dashboard': props<{
      status?: string;
      page?: number;
      limit?: number;
      search?: string;
    }>(),
    'Load Dashboard Success': props<{ response: DashboardResponse }>(),
    'Load Dashboard Failure': props<{ error: any }>(),

    'Load Admin Users': emptyProps(),
    'Load Admin Users Success': props<{ users: AdminUser[] }>(),
    'Load Admin Users Failure': props<{ error: any }>(),

    'Register Admin': props<{ firstName: string; email: string; }>(),
    'Register Admin Success': props<{ user: AdminUser }>(),
    'Register Admin Failure': props<{ error: any }>(),

    'Update Admin Role': props<{ userId: string; role: UserRole; }>(),
    'Update Admin Role Success': props<{ user: AdminUser }>(),
    'Update Admin Role Failure': props<{ error: any }>(),

    'Load Form': props<{ id: string }>(),
    'Load Form Success': props<{ form: Form }>(),
    'Load Form Failure': props<{ error: any }>(),

    'Update Form': props<{ id: string; data: Partial<Form> }>(),
    'Update Form Success': props<{ form: Form }>(),
    'Update Form Failure': props<{ error: any }>(),

    'Delete Form': props<{ id: string }>(),
    'Delete Form Success': props<{ id: string }>(),
    'Delete Form Failure': props<{ error: any }>(),

    'Approve Form': props<{ id: string }>(),
    'Approve Form Success': props<{ form: Form }>(),
    'Approve Form Failure': props<{ error: any }>(),

    'Export Forms': props<{
      fromDate?: string;
      toDate?: string;
      status?: string;
    }>(),
    'Export Forms Success': props<{ blob: Blob }>(),
    'Export Forms Failure': props<{ error: any }>(),

    'Load Audit Logs': props<{ page?: number; limit?: number; }>(),
    'Load Audit Logs Success': props<{ response: AuditLogResponse }>(),
    'Load Audit Logs Failure': props<{ error: any }>(),
  }
});
