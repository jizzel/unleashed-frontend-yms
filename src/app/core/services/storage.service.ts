import { Injectable } from '@angular/core';
import {STORAGE_KEYS} from '../models/storage.constants';
import {State} from '../../features/auth/store/reducers/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const storage = localStorage.getItem(key);
    try {
      return storage ? JSON.parse(storage) : null;
    } catch (e) {
      return storage;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  // set auth state
  setAuthState(value: any): void {
    this.setItem(STORAGE_KEYS.AUTH_STATE, JSON.stringify(value));
  }

  // get auth state
  getAuthState(): any {
    const partialAuthState: Partial<State> = {};
    // get user
    partialAuthState.user = this.getUserData();
    // get tokens
    partialAuthState.tokens = {
      access: {
        token: this.getAccessToken(),
        expires: '',
      },
      refresh: {
        token: this.getRefreshToken(),
        expires: '',
      },
    };
    return partialAuthState;
  }

  // remove auth state
  removeAuthState(): void {
    this.removeItem(STORAGE_KEYS.AUTH_STATE);
  }

  // set user
  setUserData(value: any): void {
    this.setItem(STORAGE_KEYS.USER, JSON.stringify(value));
  }

  // get user
  getUserData(): any {
    return this.getItem(STORAGE_KEYS.USER);
  }

  // remove user
  removeUserData(): void {
    this.removeItem(STORAGE_KEYS.USER);
  }

  // set access token
  setAccessToken(token: string, exp: string = ''): void {
    this.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    this.setItem(STORAGE_KEYS.ACCESS_EXPIRES, exp);
  }

  // get access token
  getAccessToken(): string {
    return this.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  // remove access token
  removeAccessToken(): void {
    this.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    this.removeItem(STORAGE_KEYS.ACCESS_EXPIRES);
  }

  // set refresh token
  setRefreshToken(token: string, exp: string = ''): void {
    this.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    this.setItem(STORAGE_KEYS.REFRESH_EXPIRES, exp);
  }

  // get refresh token
  getRefreshToken(): string {
    return this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  // remove refresh token
  removeRefreshToken(): void {
    this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    this.removeItem(STORAGE_KEYS.REFRESH_EXPIRES);
  }

  removeTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  // set user id
  setUserId(value: string): void {
    this.setItem(STORAGE_KEYS.USER_ID, value);
  }

  // get user id
  getUserId(): string {
    return this.getItem(STORAGE_KEYS.USER_ID);
  }

  // remove user id
  removeUserId(): void {
    this.removeItem(STORAGE_KEYS.USER_ID);
  }
}
