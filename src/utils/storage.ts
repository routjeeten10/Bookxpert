import { Employee } from '../types';

const EMPLOYEES_KEY = 'employees';
const AUTH_KEY = 'auth';

export const storage = {
  // Employee operations
  getEmployees: (): Employee[] => {
    const data = localStorage.getItem(EMPLOYEES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveEmployees: (employees: Employee[]): void => {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  },

  addEmployee: (employee: Employee): void => {
    const employees = storage.getEmployees();
    employees.push(employee);
    storage.saveEmployees(employees);
  },

  updateEmployee: (id: string, updatedEmployee: Employee): void => {
    const employees = storage.getEmployees();
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      storage.saveEmployees(employees);
    }
  },

  deleteEmployee: (id: string): void => {
    const employees = storage.getEmployees();
    const filtered = employees.filter(emp => emp.id !== id);
    storage.saveEmployees(filtered);
  },

  // Auth operations
  getAuth: (): { username: string; isAuthenticated: boolean } | null => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  setAuth: (username: string): void => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ username, isAuthenticated: true }));
  },

  clearAuth: (): void => {
    localStorage.removeItem(AUTH_KEY);
  },

  // Initialize mock data
  initializeMockData: (): void => {
    const existing = storage.getEmployees();
    if (existing.length === 0) {
      const mockEmployees: Employee[] = [
        {
          id: '1',
          fullName: 'John Doe',
          gender: 'Male',
          dateOfBirth: '1990-05-15',
          profileImage: '',
          state: 'California',
          isActive: true,
        },
        {
          id: '2',
          fullName: 'Jane Smith',
          gender: 'Female',
          dateOfBirth: '1988-08-22',
          profileImage: '',
          state: 'New York',
          isActive: true,
        },
        {
          id: '3',
          fullName: 'Mike Johnson',
          gender: 'Male',
          dateOfBirth: '1992-12-10',
          profileImage: '',
          state: 'Texas',
          isActive: false,
        },
      ];
      storage.saveEmployees(mockEmployees);
    }
  },
};
