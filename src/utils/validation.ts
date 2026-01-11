export interface ValidationErrors {
  fullName?: string;
  gender?: string;
  dateOfBirth?: string;
  profileImage?: string;
  state?: string;
}

export const validateEmployeeForm = (data: {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  state: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  if (!data.gender) {
    errors.gender = 'Please select a gender';
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Please select a date of birth';
  } else {
    const dob = new Date(data.dateOfBirth);
    const today = new Date();
    if (dob > today) {
      errors.dateOfBirth = 'Date of birth cannot be in the future';
    }
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18 || age > 100) {
      errors.dateOfBirth = 'Age must be between 18 and 100 years';
    }
  }

  if (!data.state || data.state.trim().length === 0) {
    errors.state = 'Please select a state';
  }

  return errors;
};
