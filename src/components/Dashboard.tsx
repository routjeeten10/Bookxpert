import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import { EmployeeList } from './EmployeeList';
import { EmployeeForm } from './EmployeeForm';
import { SearchAndFilter } from './SearchAndFilter';
import { Employee } from '../types';
import './Dashboard.css';

export const Dashboard = () => {
  const { logout, user } = useAuth();
  const { employees, filteredEmployees, loading } = useEmployees();
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const activeCount = employees.filter(emp => emp.isActive).length;
  const inactiveCount = employees.length - activeCount;

  const handleAddClick = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditClick = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Employee Management Dashboard</h1>
          <div className="header-actions">
            <span className="welcome-text">Welcome, {user?.username}</span>
            <button onClick={handlePrint} className="print-button">
              Print List
            </button>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-summary">
          <div className="summary-card">
            <h3>Total Employees</h3>
            <p className="summary-number">{employees.length}</p>
          </div>
          <div className="summary-card active">
            <h3>Active Employees</h3>
            <p className="summary-number">{activeCount}</p>
          </div>
          <div className="summary-card inactive">
            <h3>Inactive Employees</h3>
            <p className="summary-number">{inactiveCount}</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <SearchAndFilter />
          <button onClick={handleAddClick} className="add-button">
            + Add Employee
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading employees...</p>
          </div>
        ) : (
          <EmployeeList onEdit={handleEditClick} />
        )}

        {showForm && (
          <EmployeeForm
            employee={editingEmployee}
            onClose={handleFormClose}
          />
        )}
      </main>
    </div>
  );
};
