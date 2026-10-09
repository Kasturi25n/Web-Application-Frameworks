import React from 'react';

/**
 * Question 15: Child Component - EmployeeItem
 * Receives employee object and callback props (onEdit, onDelete).
 */
export default function EmployeeItem({ employee, onEdit, onDelete }) {
  return (
    <tr className="employee-row">
      <td><strong>#{employee.id}</strong></td>
      <td>
        <div className="emp-name-block">
          <span className="emp-name">{employee.name}</span>
          <span className="emp-email">{employee.email}</span>
        </div>
      </td>
      <td>
        <span className="badge badge-dept">{employee.department}</span>
      </td>
      <td>{employee.position}</td>
      <td><strong>${Number(employee.salary).toLocaleString()}</strong></td>
      <td>
        <div className="btn-group">
          <button
            className="btn btn-warning-sm"
            onClick={() => onEdit(employee)}
            title="Edit Employee"
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-danger-sm"
            onClick={() => onDelete(employee.id)}
            title="Delete Employee"
          >
            🗑️ Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
