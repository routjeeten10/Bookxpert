import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Employee, FilterOptions } from '../types';
import { storage } from '../utils/storage';

interface EmployeeContextType {
  employees: Employee[];
  filteredEmployees: Employee[];
  filters: FilterOptions;
  loading: boolean;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Omit<Employee, 'id'>) => void;
  deleteEmployee: (id: string) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  refreshEmployees: () => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [filters, setFiltersState] = useState<FilterOptions>({
    search: '',
    gender: 'All',
    status: 'All',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storage.initializeMockData();
    refreshEmployees();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [employees, filters]);

  const refreshEmployees = () => {
    setLoading(true);
    const data = storage.getEmployees();
    setEmployees(data);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...employees];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(emp =>
        emp.fullName.toLowerCase().includes(searchLower)
      );
    }

    // Gender filter
    if (filters.gender !== 'All') {
      filtered = filtered.filter(emp => emp.gender === filters.gender);
    }

    // Status filter
    if (filters.status !== 'All') {
      const isActive = filters.status === 'Active';
      filtered = filtered.filter(emp => emp.isActive === isActive);
    }

    setFilteredEmployees(filtered);
  };

  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
    };
    storage.addEmployee(newEmployee);
    refreshEmployees();
  };

  const updateEmployee = (id: string, employeeData: Omit<Employee, 'id'>) => {
    const updatedEmployee: Employee = {
      ...employeeData,
      id,
    };
    storage.updateEmployee(id, updatedEmployee);
    refreshEmployees();
  };

  const deleteEmployee = (id: string) => {
    storage.deleteEmployee(id);
    refreshEmployees();
  };

  const setFilters = (newFilters: Partial<FilterOptions>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        filteredEmployees,
        filters,
        loading,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        setFilters,
        refreshEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
