/**
 * Question 4: ExpressJS Routing
 * 
 * Requirements:
 * - GET /students → Display a list of students.
 * - GET /students/:id → Display the details of a student based on ID.
 * - GET /faculty → Display faculty information.
 * - Implement a suitable response for an invalid route.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001;

// Sample students dataset
const students = [
  { id: 1, name: 'Pushpam Raj Satyarthi', rollNumber: '2024107717', branch: 'CSE-Core', semester: '6th Semester', gpa: 3.9 },
  { id: 2, name: 'Aarav Sharma', rollNumber: '2024107718', branch: 'Computer Science', semester: '6th Semester', gpa: 3.8 },
  { id: 3, name: 'Diya Patel', rollNumber: '2024107719', branch: 'Information Technology', semester: '4th Semester', gpa: 3.95 },
  { id: 4, name: 'Rohan Verma', rollNumber: '2024107720', branch: 'Data Science', semester: '6th Semester', gpa: 3.7 }
];

// Sample faculty dataset
const faculty = [
  { id: 101, name: 'Dr. Sarah Mitchell', department: 'Computer Science', designation: 'Professor & HOD', subject: 'Cloud Computing & Distributed Systems' },
  { id: 102, name: 'Prof. David Chen', department: 'Computer Science', designation: 'Associate Professor', subject: 'Web Application Frameworks' },
  { id: 103, name: 'Dr. Ananya Roy', department: 'Information Technology', designation: 'Assistant Professor', subject: 'Database Management Systems' }
];

// Route 1: GET /students -> Display all students
app.get('/students', (req, res) => {
  res.json({
    success: true,
    count: students.length,
    students: students
  });
});

// Route 2: GET /students/:id -> Display details of student by ID
app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${req.params.id} not found.`
    });
  }

  res.json({
    success: true,
    student: student
  });
});

// Route 3: GET /faculty -> Display faculty information
app.get('/faculty', (req, res) => {
  res.json({
    success: true,
    count: faculty.length,
    faculty: faculty
  });
});

// Route 4: Invalid route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '404 Not Found',
    message: `The requested route '${req.originalUrl}' does not exist.`
  });
});

app.listen(PORT, () => {
  console.log(`[Q4] ExpressJS Routing Server is running on http://localhost:${PORT}`);
  console.log(`  - Students list: http://localhost:${PORT}/students`);
  console.log(`  - Student by ID: http://localhost:${PORT}/students/1`);
  console.log(`  - Faculty list:  http://localhost:${PORT}/faculty`);
});

module.exports = app;
