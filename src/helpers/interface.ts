export interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: Role;
}

export type Role = 'landlord' | 'tenant';
