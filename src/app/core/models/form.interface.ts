export type FormStatus = 'IN_PROGRESS' | 'SUBMITTED' | 'APPROVED';

export interface User {
  id: string;
  firstName: string | null;
  email: string;
  role: 'USER' | 'ADMIN' | 'VIEWER' | 'EDITOR';
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Prefer not to say';
  phoneNumber: string;
}

export interface LocationDetails {
  languagesSpoken: string[];
  address: string;
}

export interface ProfessionalDetails {
  occupation: string;
  skills: string[];
}

export interface SpiritualDetails {
  bornAgain: boolean;
  baptized: boolean;
  baptismType?: 'Water' | 'Holy Spirit';
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface AdditionalInfo {
  comments?: string;
}

export enum FormSectionType {
  PERSONAL_DETAILS = 'personalDetails',
  LOCATION_DETAILS = 'locationDetails',
  PROFESSIONAL_DETAILS = 'professionalDetails',
  SPIRITUAL_DETAILS = 'spiritualDetails',
  EMERGENCY_CONTACT = 'emergencyContact',
  ADDITIONAL_INFO = 'additionalInfo',
}

export interface Form {
  id: string;
  userId: string;
  status: FormStatus;
  submissionDate: string | null;
  personalDetails: PersonalDetails | null | undefined;
  locationDetails: LocationDetails | null | undefined;
  professionalDetails: ProfessionalDetails | null | undefined;
  spiritualDetails: SpiritualDetails | null | undefined;
  emergencyContact: EmergencyContact | null | undefined;
  additionalInfo: AdditionalInfo | null | undefined;
  user: User;
}

export interface RegisterFormRequest {
  firstName: string;
  email: string;
}

export interface RegisterFormResponse {
  link: string;
  formId: string;
}

export interface UpdateFormSectionRequest<T> {
  formId: string;
  data: T;
}
