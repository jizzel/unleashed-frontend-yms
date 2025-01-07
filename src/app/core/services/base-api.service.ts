import { inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.interface';
import { environment } from '../../../environments/environment';
import {ApiError} from '../models/error.interface';

export abstract class BaseApiService<T> {
  protected readonly baseUrl: string;
  protected readonly http = inject(HttpClient);

  constructor(protected endpoint: string) {
    this.baseUrl = `${environment.apiUrl}/${endpoint}`;
    console.log('BaseApiService', this.baseUrl);
  }

  protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    let apiError: ApiError;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      apiError = {
        message: error.error.message,
        code: 'CLIENT_ERROR',
        status: error.status
      };
    } else {
      // Server-side error
      apiError = {
        message: error.error?.error || 'An unexpected error occurred',
        code: error.error?.code || 'SERVER_ERROR',
        status: error.status
      };
    }

    return throwError(() => apiError);
  }

  protected get(
    path: string = '',
    params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
    headers?: HttpHeaders
  ): Observable<T> {
    const options = {
      headers: headers || this.getHeaders(),
      params: params instanceof HttpParams ? params : new HttpParams({ fromObject: params || {} })
    };

    return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${path}`, options).pipe(
      map(response => this.extractData(response)),
      catchError(error => this.handleError(error))
    );
  }

  protected post<U>(
    path: string = '',
    body: U,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${path}`, body, {
      headers: headers || this.getHeaders()
    }).pipe(
      map(response => this.extractData(response)),
      catchError(error => this.handleError(error))
    );
  }

  protected put<U>(
    path: string = '',
    body: U,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${path}`, body, {
      headers: headers || this.getHeaders()
    }).pipe(
      map(response => this.extractData(response)),
      catchError(error => this.handleError(error))
    );
  }

  protected patch<U>(
    path: string = '',
    body: U,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.patch<ApiResponse<T>>(`${this.baseUrl}/${path}`, body, {
      headers: headers || this.getHeaders()
    }).pipe(
      map(response => this.extractData(response)),
      catchError(error => this.handleError(error))
    );
  }

  protected delete(
    path: string = '',
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}/${path}`, {
      headers: headers || this.getHeaders()
    }).pipe(
      map(response => this.extractData(response)),
      catchError(error => this.handleError(error))
    );
  }

  private extractData(response: ApiResponse<T>): T {
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  }
}
