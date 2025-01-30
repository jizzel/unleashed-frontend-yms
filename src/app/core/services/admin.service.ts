import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import {
  DashboardResponse,
  Form,
  AdminUser,
  AuditLogResponse,
  UserRole
} from '../models/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseApiService<any> {
  constructor() {
    super('admins');
  }

  getDashboard(params?: {
    status?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Observable<DashboardResponse> {
    return this.get('dashboard', params);
  }

  getAdminUsers(): Observable<AdminUser[]> {
    return this.get('users');
  }

  registerAdmin(data: {
    firstName: string;
    email: string;
  }): Observable<AdminUser> {
    return this.post('register', data);
  }

  updateAdminRole(userId: string, role: UserRole): Observable<AdminUser> {
    return this.patch('role', { userId, role });
  }

  getForm(id: string): Observable<Form> {
    return this.get(`forms/${id}`);
  }

  updateForm(id: string, data: Partial<Form>): Observable<Form> {
    return this.patch(`forms/${id}`, data);
  }

  deleteForm(id: string): Observable<void> {
    return this.delete(`forms/${id}`);
  }

  approveForm(id: string): Observable<Form> {
    return this.patch(`forms/${id}/approve`, {});
  }

  exportForms(params: {
    fromDate?: string;
    toDate?: string;
    status?: string;
  }): Observable<Blob> {
    const headers = this.getHeaders().delete('Content-Type');
    return this.http.get(`${this.baseUrl}/forms/export`, {
      headers,
      params: new HttpParams({ fromObject: params }),
      responseType: 'blob'
    });
  }

  getAuditLogs(params?: {
    page?: number;
    limit?: number;
  }): Observable<AuditLogResponse> {
    return this.get('audit-logs', params);
  }
}
