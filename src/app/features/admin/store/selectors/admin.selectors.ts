import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAdmin from '../reducers/admin.reducer';

export const selectAdminState = createFeatureSelector<fromAdmin.State>(
  fromAdmin.adminFeatureKey
);

export const selectDashboard = createSelector(
  selectAdminState,
  (state) => state.dashboard.data
);

export const selectDashboardLoading = createSelector(
  selectAdminState,
  (state) => state.dashboard.loading
);

export const selectDashboardError = createSelector(
  selectAdminState,
  (state) => state.dashboard.error
);

export const selectAdminUsers = createSelector(
  selectAdminState,
  (state) => state.adminUsers.data
);

export const selectCurrentForm = createSelector(
  selectAdminState,
  (state) => state.currentForm.data
);

export const selectAuditLogs = createSelector(
  selectAdminState,
  (state) => state.auditLogs.data
);

export const selectFormStats = createSelector(
  selectDashboard,
  (dashboard) => dashboard?.stats || []
);

export const selectFormsList = createSelector(
  selectDashboard,
  (dashboard) => dashboard?.forms || []
);

export const selectPaginationMeta = createSelector(
  selectDashboard,
  (dashboard) => dashboard?.meta
);
