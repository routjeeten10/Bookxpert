import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { Employee } from '../types';
import { validateEmployeeForm, ValidationErrors } from '../utils/validation';
import { convertImageToBase64, validateImageFile } from '../utils/imageUtils';
import './EmployeeForm.css';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

interface EmployeeFormProps {
  employee: Employee | null;
  onClose: () => void;
}

export const EmployeeForm = ({ employee, onClose }: EmployeeFormProps) => {
  const { addEmployee, updateEmployee } = useEmployees();
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '' as 'Male' | 'Female' | 'Other' | '',
    dateOfBirth: '',
    profileImage: '',
    state: '',
    isActive: true,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        fullName: employee.fullName,
        gender: employee.gender,
        dateOfBirth: employee.dateOfBirth,
        profileImage: employee.profileImage,
        state: employee.state,
        isActive: employee.isActive,
      });
      setImagePreview(employee.profileImage);
    }
  }, [employee]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'isActive' ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error for this field
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, profileImage: validation.error }));
      return;
    }

    try {
      const base64 = await convertImageToBase64(file);
      setFormData(prev => ({ ...prev, profileImage: base64 }));
      setImagePreview(base64);
      setErrors(prev => ({ ...prev, profileImage: undefined }));
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        profileImage: 'Failed to process image',
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validateEmployeeForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      if (employee) {
        updateEmployee(employee.id, formData as Omit<Employee, 'id'>);
      } else {
        addEmployee(formData as Omit<Employee, 'id'>);
      }
      onClose();
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, profileImage: '' }));
    setImagePreview('');
  };

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">
                Full Name <span className="required">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="gender">
                Gender <span className="required">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={errors.gender ? 'error' : ''}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <span className="error-message">{errors.gender}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">
                Date of Birth <span className="required">*</span>
              </label>
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && (
                <span className="error-message">{errors.dateOfBirth}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="state">
                State <span className="required">*</span>
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={errors.state ? 'error' : ''}
              >
                <option value="">Select State</option>
                {US_STATES.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <span className="error-message">{errors.state}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <div className="image-upload-section">
              {imagePreview ? (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="remove-image-btn"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="image-upload-box">
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                  />
                  <label htmlFor="profileImage" className="image-upload-label">
                    <span>📷</span>
                    <span>Click to upload image</span>
                  </label>
                </div>
              )}
              {errors.profileImage && (
                <span className="error-message">{errors.profileImage}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              <span>Active Employee</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Saving...' : employee ? 'Update' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
