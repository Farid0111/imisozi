export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  preferences?: {
    language: string;
    notifications: boolean;
  };
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  fullName: string;
  phone?: string;
}

export interface UserProfile {
  fullName: string;
  phone?: string;
  preferences?: {
    language: string;
    notifications: boolean;
  };
} 