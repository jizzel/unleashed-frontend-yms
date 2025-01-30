export interface FormStats {
  _count: number;
  status: FormStatus;
}

export interface DashboardResponse {
  stats: FormStats[];
  forms: Form[];
  meta: PaginationMeta;
}

export interface Form {
  id: string;
  userId: string;
  status: FormStatus;
  submissionDate: string | null;
  personalDetails: PersonalDetails | null;
  locationDetails: LocationDetails | null;
  professionalDetails: ProfessionalDetails | null;
  spiritualDetails: SpiritualDetails | null;
  emergencyContact: EmergencyContact | null;
  additionalInfo: string | null;
  user: {
    firstName: string;
    email: string;
  };
}

export interface PersonalDetails {
  email: string;
  gender: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  phoneNumber: string;
}

export interface LocationDetails {
  address: string;
  languagesSpoken: string[];
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

export interface PaginationMeta {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPage: number | null;
  lastPage: number;
}

export interface AdminUser {
  id: string;
  firstName: string | null;
  email: string;
  role: UserRole;
}

export enum FormStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED'
}

export enum UserRole {
  USER = 'USER',
  VIEWER = 'VIEWER',
  EDITOR = 'EDITOR'
}

export interface AuditLog {
  id: string;
  action: string;
  actorId: string;
  actorType: string;
  resourceType: string;
  resourceId: string;
  metadata: {
    ip: string;
    url: string;
    body: any;
    query: any;
    method: string;
    duration: number;
    response: any;
    resStatus: number;
  };
  timestamp: string;
  actor: AdminUser;
}

export interface AuditLogResponse {
  items: AuditLog[];
  meta: PaginationMeta;
}
