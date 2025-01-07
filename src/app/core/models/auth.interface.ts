export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenInfo {
  token: string;
  expires: string;
}

export interface Tokens {
  access: TokenInfo;
  refresh: TokenInfo;
}

export interface User {
  userId: string;
  firstName: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: Tokens;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
  USER = 'USER'
}
