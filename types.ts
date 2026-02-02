
export enum UserRole {
  ADMIN = 'ADMIN',
  RESIDENT = 'RESIDENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  houseNumber?: string;
}

export interface ServiceRequest {
  id: string;
  residentId: string;
  residentName: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  category: 'MAINTENANCE' | 'SECURITY' | 'UTILITIES' | 'OTHERS';
  imageUrl?: string;
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
  residentId: string;
  amount: number;
  date: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  description: string;
}
