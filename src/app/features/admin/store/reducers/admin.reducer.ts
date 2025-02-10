import { createFeature, createReducer, on } from '@ngrx/store';
import { AdminActions } from '../actions/admin.actions';
import {
  AuditLogResponse,
  DashboardResponse,
  Form,
  UsersResponse
} from '../../../../core/models/admin.interface';

export const adminFeatureKey = 'admin';

export interface State {
  dashboard: {
    data: DashboardResponse | null;
    loading: boolean;
    error: any;
  };
  adminUsers: {
    data: UsersResponse | null;
    loading: boolean;
    error: any;
  };
  currentForm: {
    data: Form | null;
    loading: boolean;
    error: any;
  };
  auditLogs: {
    data: AuditLogResponse | null;
    loading: boolean;
    error: any;
  };
}

export const initialState: State = {
  dashboard: {
    data: null,
    loading: false,
    error: null
  },
  adminUsers: {
    data: null,
    loading: false,
    error: null
  },
  currentForm: {
    data: null,
    loading: false,
    error: null
  },
  auditLogs: {
    data: null,
    loading: false,
    error: null
  }
};

export const reducer = createReducer(
  initialState,
  // Dashboard
  on(AdminActions.loadDashboard, (state): State => ({
    ...state,
    dashboard: { ...state.dashboard, loading: true, error: null }
  })),
  on(AdminActions.loadDashboardSuccess, (state, { response }): State => ({
    ...state,
    dashboard: { data: response, loading: false, error: null }
  })),
  on(AdminActions.loadDashboardFailure, (state, { error }): State => ({
    ...state,
    dashboard: { ...state.dashboard, loading: false, error }
  })),

  // Admin Users
  on(AdminActions.loadAdminUsers, (state): State => ({
    ...state,
    adminUsers: { ...state.adminUsers, loading: true, error: null }
  })),
  on(AdminActions.loadAdminUsersSuccess, (state, { response }): State => ({
    ...state,
    adminUsers: { data: response, loading: false, error: null }
  })),
  on(AdminActions.loadAdminUsersFailure, (state, { error }): State => ({
    ...state,
    adminUsers: { ...state.adminUsers, loading: false, error }
  })),

  // Current Form
  on(AdminActions.loadForm, (state): State => ({
    ...state,
    currentForm: { ...state.currentForm, loading: true, error: null }
  })),
  on(AdminActions.loadFormSuccess, (state, { form }): State => ({
    ...state,
    currentForm: { data: form, loading: false, error: null }
  })),
  on(AdminActions.loadFormFailure, (state, { error }): State => ({
    ...state,
    currentForm: { ...state.currentForm, loading: false, error }
  })),

  // Audit Logs
  on(AdminActions.loadAuditLogs, (state): State => ({
    ...state,
    auditLogs: { ...state.auditLogs, loading: true, error: null }
  })),
  on(AdminActions.loadAuditLogsSuccess, (state, { response }): State => ({
    ...state,
    auditLogs: { data: response, loading: false, error: null }
  })),
  on(AdminActions.loadAuditLogsFailure, (state, { error }): State => ({
    ...state,
    auditLogs: { ...state.auditLogs, loading: false, error }
  }))
);

export const adminFeature = createFeature({
  name: adminFeatureKey,
  reducer,
});

