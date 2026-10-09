import React, { useState } from 'react';
import Student from './Student';

/**
 * Question 11: Program Showcase
 * Demonstrates the reusable Student component accepting name, branch, and semester via props.
 */
export default function Program11() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Pushpam Raj Satyarthi',
      rollNumber: '2024107717',
      branch: 'Computer Science and Engineering (CSE-Core)',
      semester: '6th Semester',
      email: 'pushpam@university.edu'
    },
    {
      id: 2,
      name: 'Aarav Sharma',
      rollNumber: '2024107718',
      branch: 'Artificial Intelligence & Machine Learning',
      semester: '6th Semester',
      email: 'aarav.sharma@university.edu'
    },
    {
      id: 3,
      name: 'Diya Patel',
      rollNumber: '2024107719',
      branch: 'Information Technology',
      semester: '4th Semester',
      email: 'diya.patel@university.edu'
    },
    {
      id: 4,
      name: 'Rohan Verma',
      rollNumber: '2024107720',
      branch: 'Cyber Security & Forensic',
      semester: '8th Semester',
      email: 'rohan.verma@university.edu'
    }
  ]);

  // Form state to dynamically test adding more reusable component instances
  const [newName, setNewName] = useState('');
  const [newBranch, setNewBranch] = useState('');
  const [newSemester, setNewSemester] = useState('1st Semester');

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newBranch.trim()) return;

    setStudents([
      ...students,
      {
        id: Date.now(),
        name: newName.trim(),
        rollNumber: `202410${Math.floor(1000 + Math.random() * 9000)}`,
        branch: newBranch.trim(),
        semester: newSemester,
        email: `${newName.toLowerCase().replace(/\s+/g, '.')}@university.edu`
      }
    ]);
    setNewName('');
    setNewBranch('');
  };

  return (
    <div className="program-container">
      <div className="program-header">
        <h2>Question 11: Reusable Student Component</h2>
        <p className="subtitle">
          Develop a ReactJS program to create a reusable Student component that accepts
          <code>student name</code>, <code>branch</code>, and <code>semester</code> through props and displays the details.
        </p>
      </div>

      <div className="card-section">
        <h3>Add Custom Student (Demonstrating Dynamic Prop Passing)</h3>
        <form onSubmit={handleAddStudent} className="inline-form">
          <input
            type="text"
            placeholder="Student Name (e.g., Pushpam)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Branch (e.g., CSE-Core)"
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
            required
          />
          <select value={newSemester} onChange={(e) => setNewSemester(e.target.value)}>
            <option value="1st Semester">1st Semester</option>
            <option value="2nd Semester">2nd Semester</option>
            <option value="3rd Semester">3rd Semester</option>
            <option value="4th Semester">4th Semester</option>
            <option value="5th Semester">5th Semester</option>
            <option value="6th Semester">6th Semester</option>
            <option value="7th Semester">7th Semester</option>
            <option value="8th Semester">8th Semester</option>
          </select>
          <button type="submit" className="btn btn-primary">Render Component</button>
        </form>
      </div>

      <div className="grid-container">
        {students.map((student) => (
          <Student
            key={student.id}
            name={student.name}
            branch={student.branch}
            semester={student.semester}
            rollNumber={student.rollNumber}
            email={student.email}
          />
        ))}
      </div>
    </div>
  );
}
