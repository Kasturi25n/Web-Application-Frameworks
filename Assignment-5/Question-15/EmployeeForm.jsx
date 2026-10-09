import React, { useState, useEffect } from 'react';

/**
 * Question 15: Child Component - EmployeeForm
 * Reusable form component for both Adding and Updating employee data.
 * Receives initialData, isEditing, onSubmit, onCancel via props.
 */
export default function EmployeeForm({ initialData, isEditing, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    position: '',
    salary: ''
  });

  // When initialData changes (e.g. user clicks Edit on a different employee), update form state
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        email: '',
        department: 'Engineering',
        position: '',
        salary: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.position.trim()) return;
    onSubmit(formData);
  };

  return (
    <div className="card-section form-card">
      <h3>{isEditing ? `✏️ Update Employee #${initialData.id}` : '➕ Add New Employee'}</h3>
      <form onSubmit={handleSubmit} className="employee-form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Pushpam Raj"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="e.g. pushpam@company.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <select name="department" value={formData.department} onChange={handleChange}>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Product">Product</option>
            <option value="Marketing">Marketing</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div className="form-group">
          <label>Position / Role *</label>
          <input
            type="text"
            name="position"
            placeholder="e.g. Senior Software Engineer"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Annual Salary ($) *</label>
          <input
            type="number"
            name="salary"
            placeholder="e.g. 95000"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions-full">
          <button type="submit" className="btn btn-primary">
            {isEditing ? '💾 Update Employee Details' : '➕ Add Employee'}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              ❌ Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
