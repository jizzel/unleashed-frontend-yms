import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { LoginRequest, AuthResponse } from '../models/auth.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService<AuthResponse> {
  constructor(private router: Router) {
    super('admins');
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.post('login', credentials);
  }

  refreshToken(token: string): Observable<AuthResponse> {
    return this.post('refresh-token', { token });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    // return this.post('logout', {refresh_token: this.getRefreshToken()});
  }

  // Helper methods for token management
  setTokens(response: AuthResponse): void {
    localStorage.setItem('accessToken', response.token.access.token);
    localStorage.setItem('refreshToken', response.token.refresh.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getCurrentUser(): AuthResponse['user'] | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
