import { Injectable } from '@angular/core';
import {STORAGE_KEYS} from '../models/storage.constants';

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
    return storage ? JSON.parse(storage) : null;
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
    return this.getItem(STORAGE_KEYS.AUTH_STATE);
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
  setAccessToken(value: string): void {
    this.setItem(STORAGE_KEYS.ACCESS_TOKEN, value);
  }

  // get access token
  getAccessToken(): string {
    return this.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  // remove access token
  removeAccessToken(): void {
    this.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  // set refresh token
  setRefreshToken(value: string): void {
    this.setItem(STORAGE_KEYS.REFRESH_TOKEN, value);
  }

  // get refresh token
  getRefreshToken(): string {
    return this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  // remove refresh token
  removeRefreshToken(): void {
    this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
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
