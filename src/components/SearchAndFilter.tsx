import { useEmployees } from '../context/EmployeeContext';
import { FilterOptions } from '../types';
import './SearchAndFilter.css';

export const SearchAndFilter = () => {
  const { filters, setFilters } = useEmployees();

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <select
          value={filters.gender}
          onChange={(e) => setFilters({ gender: e.target.value as FilterOptions['gender'] })}
          className="filter-select"
        >
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value as FilterOptions['status'] })}
          className="filter-select"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};
