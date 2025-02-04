import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { LoginRequest, AuthResponse } from '../models/auth.interface';
import {Router} from '@angular/router';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService<AuthResponse> {
  constructor(private router: Router, private storageService: StorageService) {
    super('admins');
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.post('login', credentials);
  }

  refreshToken(token: string): Observable<AuthResponse> {
    return this.post('refresh-token', { token });
  }

  logout(){
    this.storageService.clear();
    this.router.navigate(['/auth/login']);
    // return this.post('logout', {refresh_token: this.getRefreshToken()});
  }

  // Helper methods for token management
  setTokens(response: AuthResponse): void {
    this.storageService.setAccessToken(response.token.access.token, response.token.access.expires);
    this.storageService.setRefreshToken(response.token.refresh.token, response.token.refresh.expires);
    this.storageService.setItem('user', response.user);
  }

  getAccessToken(): string | null {
    return this.storageService.getAccessToken();
  }

  getRefreshToken(): string | null {
    return this.storageService.getRefreshToken();
  }

  getCurrentUser(): AuthResponse['user'] | null {
    return this.storageService.getUserData();
  }

  clearTokens(): void {
    this.storageService.removeTokens();
    this.clearUser();
  }

  clearUser(): void {
    this.storageService.removeUserData();
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
