import React, { useState } from 'react';
import EmployeeItem from './EmployeeItem';
import EmployeeForm from './EmployeeForm';

/**
 * Question 15: Employee Management Application
 * 
 * Requirements:
 * - Develop a ReactJS Employee Management application using components, props, and Hooks.
 * - Display employee details.
 * - Implement functionality to add a new employee and update an existing employee's information.
 * 
 * Student: Pushpam Raj Satyarthi
 */
export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Pushpam Raj Satyarthi',
      email: 'pushpam.raj@techcorp.com',
      department: 'Engineering',
      position: 'Lead Full-Stack Engineer',
      salary: 115000
    },
    {
      id: 2,
      name: 'Samantha Lee',
      email: 'samantha.lee@techcorp.com',
      department: 'Product',
      position: 'Senior Product Manager',
      salary: 105000
    },
    {
      id: 3,
      name: 'Alexander Wright',
      email: 'alex.wright@techcorp.com',
      department: 'Design',
      position: 'Lead UI/UX Designer',
      salary: 92000
    }
  ]);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Add new employee handler
  const handleAddEmployee = (newEmployeeData) => {
    const newId = employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
    const newRecord = {
      ...newEmployeeData,
      id: newId
    };
    setEmployees([...employees, newRecord]);
    showBanner(`✅ Added new employee: ${newRecord.name}`);
  };

  // Update existing employee handler
  const handleUpdateEmployee = (updatedData) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedData.id ? { ...emp, ...updatedData } : emp))
    );
    setEditingEmployee(null);
    showBanner(`💾 Successfully updated details for ${updatedData.name} (ID: #${updatedData.id})`);
  };

  // Delete employee handler
  const handleDeleteEmployee = (id) => {
    const emp = employees.find((e) => e.id === id);
    if (window.confirm(`Are you sure you want to remove ${emp?.name || 'this employee'}?`)) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      if (editingEmployee && editingEmployee.id === id) {
        setEditingEmployee(null);
      }
      showBanner(`🗑️ Removed employee #${id}`);
    }
  };

  const showBanner = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage('');
    }, 4000);
  };

  return (
    <div className="program-container">
      <div className="program-header">
        <h2>Question 15: Employee Management Application</h2>
        <p className="subtitle">
          Demonstrates components, props, and React Hooks (<code>useState</code>, <code>useEffect</code>).
          Display employee details, add new employees, and update existing employees seamlessly.
        </p>
      </div>

      {statusMessage && (
        <div className="notification-banner success">
          <div className="notification-icon">✨</div>
          <div className="notification-content">{statusMessage}</div>
        </div>
      )}

      {/* Add / Edit Form Component */}
      <EmployeeForm
        initialData={editingEmployee}
        isEditing={!!editingEmployee}
        onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
        onCancel={() => setEditingEmployee(null)}
      />

      {/* Employee List Table */}
      <div className="card-section">
        <div className="section-header-flex">
          <h3>Employee Directory ({employees.length} Members)</h3>
        </div>

        {employees.length === 0 ? (
          <p className="empty-text">No employees registered yet. Use the form above to add one.</p>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee Info</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <EmployeeItem
                    key={emp.id}
                    employee={emp}
                    onEdit={(item) => {
                      setEditingEmployee(item);
                      window.scrollTo({ top: 150, behavior: 'smooth' });
                    }}
                    onDelete={handleDeleteEmployee}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
