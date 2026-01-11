export interface Employee {
  id: string;
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  profileImage: string;
  state: string;
  isActive: boolean;
}

export interface AuthUser {
  username: string;
  isAuthenticated: boolean;
}

export interface FilterOptions {
  search: string;
  gender: 'All' | 'Male' | 'Female' | 'Other';
  status: 'All' | 'Active' | 'Inactive';
}
