export interface FormError {
  firstname?: string;
  lastname?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface User {
  userId: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  provider: string;
}

export interface Activities {
  id: string;
  userId: string;
  activityType: string;
  ipAddress: string;
  details: { [key: string]: string };
  createdAt: Date;
}
