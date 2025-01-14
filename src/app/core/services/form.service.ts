import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import {
  Form,
  RegisterFormRequest,
  RegisterFormResponse,
  PersonalDetails,
  LocationDetails,
  ProfessionalDetails,
  SpiritualDetails,
  EmergencyContact,
  AdditionalInfo
} from '../models/form.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService extends BaseApiService<any> {
  constructor() {
    super('forms');
  }

  getAllForms(): Observable<Form[]> {
    return this.get();
  }

  getFormById(formId: string): Observable<Form> {
    return this.get(formId);
  }

  registerForm(data: RegisterFormRequest): Observable<RegisterFormResponse> {
    return this.post('register', data);
  }

  submitForm(formId: string): Observable<Form> {
    return this.post('submit', { formId });
  }

  updateSectionDetails(formId: string, section: string, data: PersonalDetails | LocationDetails | ProfessionalDetails | SpiritualDetails | EmergencyContact | AdditionalInfo): Observable<Form> {
    return this.patch(`section/${section}`, { formId, data });
  }
}
