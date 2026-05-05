
export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  RESIDENT = 'RESIDENT'
}

export interface Unit {
  id: string;
  number: string;
  ownerName: string;
  ownerEmail?: string;
  status: 'OCCUPIED' | 'VACANT' | 'UNDER_MAINTENANCE';
}

export interface TaxSchedule {
  generationDay: number;
  dueDay: number;
  frequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUALLY';
}

export interface Building {
  id: string;
  name: string;
  units: Unit[];
  taxSchedule?: TaxSchedule;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  houseNumber?: string;
}

export type ServiceCategory = 
  | 'MAINTENANCE_PERMIT' 
  | 'CONSTRUCTION_PERMIT' 
  | 'VENUE_PERMIT' 
  | 'INTERNET_INSTALL' 
  | 'BORROWERS_SLIP' 
  | 'SATISFACTION_FEEDBACK';

export interface ServiceRequest {
  id: string;
  residentId: string;
  residentName: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  category: ServiceCategory;
  imageUrl?: string;
  details?: any; // To store specific form data
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: 'URGENT' | 'GENERAL' | 'EVENT';
}

export interface Payment {
  id: string;
  unitId: string;
  residentName: string;
  amount: number;
  billingDate: string;
  dueDate: string;
  paymentDate?: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  receiptUrl?: string;
  remarks?: string;
}
