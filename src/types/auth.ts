export interface LoginRequest {
  idToken: string;
  provider: 'google' | 'microsoft' | 'apple' | 'local';
}

