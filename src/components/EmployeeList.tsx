import { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { Employee } from '../types';
import './EmployeeList.css';

interface EmployeeListProps {
  onEdit: (employee: Employee) => void;
}

export const EmployeeList = ({ onEdit }: EmployeeListProps) => {
  const { filteredEmployees, updateEmployee, deleteEmployee } = useEmployees();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleToggleActive = (employee: Employee) => {
    updateEmployee(employee.id, {
      ...employee,
      isActive: !employee.isActive,
    });
  };

  const handleDelete = async (employee: Employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.fullName}?`)) {
      setDeletingId(employee.id);
      setTimeout(() => {
        deleteEmployee(employee.id);
        setDeletingId(null);
      }, 300);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (filteredEmployees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <h3>No employees found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="employee-list-container">
      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                className={deletingId === employee.id ? 'deleting' : ''}
              >
                <td className="employee-id">{employee.id}</td>
                <td>
                  <div className="profile-image-cell">
                    {employee.profileImage ? (
                      <img
                        src={employee.profileImage}
                        alt={employee.fullName}
                        className="profile-image"
                      />
                    ) : (
                      <div className="profile-placeholder">
                        {employee.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </td>
                <td className="employee-name">{employee.fullName}</td>
                <td>{employee.gender}</td>
                <td>{formatDate(employee.dateOfBirth)}</td>
                <td>{employee.state}</td>
                <td>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={employee.isActive}
                      onChange={() => handleToggleActive(employee)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </label>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(employee)}
                      className="action-btn edit-btn"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(employee)}
                      className="action-btn delete-btn"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
